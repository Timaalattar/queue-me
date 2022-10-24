'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_askequestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_askequestion.init({
    userId: DataTypes.INTEGER,
    askquestionsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_askequestion',
  });
  return user_askequestion;
};