'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class askquestions_waitlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  askquestions_waitlist.init({
    askquestionsId: DataTypes.INTEGER,
    waitlistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'askquestions_waitlist',
  });
  return askquestions_waitlist;
};