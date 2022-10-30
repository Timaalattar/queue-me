'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class waitlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.waitlist.belongsTo(models.question)
    }
  }
  waitlist.init({
    category: DataTypes.STRING,
    officeHour: DataTypes.STRING,
    breakTime: DataTypes.STRING,
    answer: DataTypes.STRING,
    askquestionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'waitlist',
  });
  return waitlist;
};