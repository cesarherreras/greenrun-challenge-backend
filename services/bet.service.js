const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class BetService {
  constructor() {}

  async find(params) {
    const { sport, eventId } = params;
    let options = {
      where: {}
    }
    if(!sport && eventId){
      options.where =  { eventId }
    }else if (!eventId && sport) {
      options.where = { sport }
    }else if (sport && eventId) {
      options.where = { sport, eventId }
    }
    const rta = await models.Bet.findAll(options);
    return rta;
  }

  async findOne(id) {
    const bet = await models.Bet.findByPk(id);
    if (!bet) {
      throw boom.notFound('user not found');
    }
    return bet;
  }

  async update(changes) {
    let rta = [];
    const betsToUpdate = changes.id;
    delete changes.id;
    await Promise.all(betsToUpdate.map(async(id) => {
      const bet = await this.findOne(id);
      if(bet.dataValues.status !== 'settled'){
        const betUpdated = await bet.update(changes);
        rta.push(betUpdated);
      }
    }));
    const output = await models.Bet.findAll({
      where: {
        id: {
          [Op.in]: betsToUpdate
        }
      }
    });
    return output;
  }

  async settledBet(changes) {
    const betsToSettled = changes.id;
    delete changes.id;
    await Promise.all(betsToSettled.map(async(id) => {
      const bet = await models.Bet.findByPk(id, {
        include: ['userItems']
      });
      if(bet.dataValues.status === 'active'){
        changes.status = 'settled'
        await bet.update(changes);

        if(bet.userItems.length !== 0) {
          const stateData = {};

          if(bet.dataValues.result === 'won' && bet.dataValues.userItems[0].UserBet.dataValues.state === 'open'){
            const addData = {
              userId: bet.dataValues.userItems[0].dataValues.id,
              amount: Math.abs((bet.dataValues.userItems[0].UserBet.dataValues.amount) * (bet.dataValues.odd)),
              status:'done',
              category: 'winning'
            }
            await models.Transaction.create(addData);
            //Update settled state user-bet
            stateData.state = 'won';
            await models.UserBet.update(stateData, {
              where: {id: bet.dataValues.userItems[0].UserBet.dataValues.id}
            });
          }else if(bet.dataValues.result === 'lost' && bet.dataValues.userItems[0].UserBet.dataValues.state === 'open'){
            stateData.state = 'lost';
            await models.UserBet.update(stateData, {
              where: {id: bet.dataValues.userItems[0].UserBet.dataValues.id}
            });
          }
        }
      }
    }));
    const output = await models.Bet.findAll({
        where: {
          id: {
            [Op.in]: betsToSettled
          }
        }
      });
      return output;
  }
}

module.exports = BetService;
