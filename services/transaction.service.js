const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');
const boom  = require('@hapi/boom');

class TransactionService {
  constructor() {}

  //Admin get user balance
  async getBalance(userId) {
    const balance = await models.Transaction.findAll({
      where: {userId: userId},
      attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'totalAmount']],
      raw: true
    });
    const userBalance = balance[0].totalAmount;
    return {
      userId,
      balance: userBalance
    };
  }

  //Admin get transactions list
  async adminGetTransactions(params) {
    const { userId, category } = params;
    let options = {
      where: {}
    }
    if(!userId && category){
      options.where =  { category }
    }else if (!category && userId) {
      options.where = { userId }
    }else if (userId && category) {
      options.where = { userId, category }
    }
    const transactions = await models.Transaction.findAll(options);
    return transactions;
  }

  //User get profile - transactions
  async getTransactions(user, params) {
    const { category } = params;
    let options = {
      where: { userId: user }
    }
    if(category){
      options.where =  {
        userId: user,
        category
      }
    }
    const updatedTotalAmount = await models.Transaction.findAll(options);
    return updatedTotalAmount;
  }

  //Create transaction-deposit
  async createDeposit(user, data) {
    const addCategoryData = {
      ...data,
      userId: user,
      category: 'deposit'
    }
    const newTransaction = await models.Transaction.create(addCategoryData);
    const updatedTotalAmount = await models.Transaction.findAll({
      where: {userId: user},
      attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'totalAmount']],
      raw: true
    });
    const addingBalance = {
      ...newTransaction.dataValues,
      balance: updatedTotalAmount[0].totalAmount
    }
    return addingBalance;
  }

  //Create transaction-withdraw
  async createWithdraw(user, data) {
    //Calculate and check the user balance
    const totalAmount = await models.Transaction.findAll({
      where: {userId: user},
      attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'totalAmount']],
      raw: true
    });
    if(totalAmount[0].totalAmount >= data.amount) {
      const addCategoryData = {
          ...data,
          userId: user,
          amount: data.amount * (-1),
          category: 'withdraw'
        }
      const newTransaction = await models.Transaction.create(addCategoryData);
      const updatedTotalAmount = await models.Transaction.findAll({
        where: {userId: user},
        attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'totalAmount']],
        raw: true
      });
      const addingBalance = {
        ...newTransaction.dataValues,
        balance: updatedTotalAmount[0].totalAmount
      }
      return addingBalance;
    }else {
      throw boom.badRequest('You do not have enough account money to do this transaction');
    }
  }
}

module.exports = TransactionService;
