'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.belongsToMany(models.askquestions, { through: "user_askequestions" })
    }
  }
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    instructor: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};