'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { TRANSACTION_TABLE } = require('./../models/transactions.model');
const { USER_BET_TABLE } = require('./../models/user-bets.model');
const { BET_TABLE } = require('./../models/bets.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'user'
      },
      firstName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'first_name'
      },
      lastName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'last_name',
      },
      phone: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      userName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
        field: 'user_name'
      },
      gender: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      birthDate: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'birth_date'
      },
      country: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      category: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      documentId: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
        field: 'document_id'
      },
      userState: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'user_state',
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      },
      deleted: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'deleted_at',
      }
    });
    await queryInterface.createTable(TRANSACTION_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.DECIMAL
      },
      category: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      status: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      },
      deleted: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'deleted_at',
      },
      userBetId: {
        field: 'user_bet_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      }
    });
    await queryInterface.createTable(BET_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      betOption: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        field: 'bet_option'
      },
      sport: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'active'
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      eventId: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'event_id'
      },
      odd: {
        allowNull: false,
        type: Sequelize.DataTypes.FLOAT
      },
      result: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      },
      deleted: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'deleted_at'
      }
    });
    await queryInterface.createTable(USER_BET_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      betId: {
        field: 'bet_id',
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: BET_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      odd: {
        allowNull: false,
        type: Sequelize.DataTypes.FLOAT
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.DECIMAL
      },
      state: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      },
      deleted: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'deleted_at'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(TRANSACTION_TABLE);
    await queryInterface.dropTable(BET_TABLE);
    await queryInterface.dropTable(USER_BET_TABLE);
  }
};
