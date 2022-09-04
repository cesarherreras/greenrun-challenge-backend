const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { BET_TABLE } = require('./bets.model');

const USER_BET_TABLE = 'userBets';

const UserBetSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  betId: {
    field: 'bet_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: BET_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  odd: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  },
  deleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at'
  }
}

class UserBet extends Model {
  static associate(models) {
    this.belongsTo(models.Bet , {as: 'bet'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_BET_TABLE,
      modelName: 'UserBet',
      timestamps: false
    }
  }
}


module.exports = { USER_BET_TABLE, UserBetSchema, UserBet }
