'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.question.belongsTo(models.user)
      models.question.belongsTo(models.waitlist)
      models.question.hasMany(models.comment)
    }
  }
  question.init({
    title: DataTypes.STRING,
    question: DataTypes.STRING,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    waitlistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};