const { Model, DataTypes, Sequelize } = require('sequelize');

const BET_TABLE = 'bets';

const BetSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  betOption: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'bet_option'
  },
  sport: {
    allowNull: false,
    type: DataTypes.STRING
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active'
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  eventId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'event_id'
  },
  odd: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  result: {
    allowNull: false,
    type: DataTypes.STRING
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

class Bet extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      as: 'userItems',
      through: models.UserBet,
      foreignKey: 'betId',
      otherKey: 'userId'
    });
    this.hasMany(models.UserBet , {
      as: 'userBets',
      foreignKey: 'betId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BET_TABLE,
      modelName: 'Bet',
      timestamps: false
    }
  }
}


module.exports = { BET_TABLE, BetSchema, Bet }
