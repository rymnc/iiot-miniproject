'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cardDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cardDetails.belongsTo(models.user, {
        foreignKey: 'userId',
        targetKey: 'id'
      })
    }
  };
  cardDetails.init({
    userId: DataTypes.INTEGER,
    cardNumber: DataTypes.STRING,
    cardCvv: DataTypes.INTEGER,
    cardExpiry: DataTypes.DATE,
    cardholderName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cardDetails',
  });
  return cardDetails;
};