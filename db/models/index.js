const { User, UserSchema } = require('./user.model');
const { Transaction, TransactionSchema } = require('./transactions.model');
const { UserBet, UserBetSchema } = require('./user-bets.model');
const { Bet, BetSchema } = require('./bets.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Transaction.init(TransactionSchema, Transaction.config(sequelize));
  UserBet.init(UserBetSchema, UserBet.config(sequelize));
  Bet.init(BetSchema, Bet.config(sequelize));

  User.associate(sequelize.models);
  Transaction.associate(sequelize.models);
  Bet.associate(sequelize.models);
}

module.exports = setupModels;
