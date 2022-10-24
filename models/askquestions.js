'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class askquestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.askquestions.belongsToMany(models.user, { through: "user_askquestions" })
      models.askquestions.belongsToMany(models.waitlist, { through: "askquestions_waitlist" })
    }
  }
  askquestions.init({
    title: DataTypes.STRING,
    question: DataTypes.STRING,
    category: DataTypes.STRING,
    answer: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'askquestions',
  });
  return askquestions;
};