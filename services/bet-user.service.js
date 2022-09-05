const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op, Sequelize } = require('sequelize');

class UserBetService {
  constructor() {}

  async create(user, data) {
    const betsTocreate = data.bets;
    await Promise.all(betsTocreate.map(async(element) => {
      //Calculate and check the user balance
      const totalAmount = await models.Transaction.findAll({
        where: {userId: user},
        attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'totalAmount']],
        raw: true
      });
      if(totalAmount[0].totalAmount >= element.amount) {
        const addData = {
            userId: user,
            amount: element.amount * (-1),
            status:'done',
            category: 'bet'
          }
        const bet = await models.UserBet.findOne({
          where: { betId: element.betId}
        });
        if(!bet) {
          const existingBet = await models.Bet.findOne({
            where: { id: element.betId }
          });
          if(existingBet.dataValues.status === 'active') {
            await models.UserBet.create(element);
            await models.Transaction.create(addData);
          }
        }
      }else {
        throw boom.badRequest('You do not have enough account money to do this bet');
      }
    }));
    const outputArray = betsTocreate.map((element) => {return element.betId});
    const output = await models.UserBet.findAll({
      where: {
        betId: {
          [Op.in]: outputArray
        }
      }
    });
    return output;
  }
}

module.exports = UserBetService;
