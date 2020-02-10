'use strict';
const {hashing} = require('../helper/bcyript')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },{sequelize,hooks: {
    beforeCreate(user,options){
      user.password = hashing(user.password)
    }
  }})
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};