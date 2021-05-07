'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cardDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      cardNumber: {
        type: Sequelize.STRING
      },
      cardCvv: {
        type: Sequelize.INTEGER
      },
      cardExpiry: {
        type: Sequelize.DATE
      },
      cardholderName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cardDetails');
  }
};