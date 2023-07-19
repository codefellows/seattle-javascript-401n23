const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./userModel');

const DATABASE_URL = process.env.DBURL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const userMod = userModel(sequelizeDatabase, DataTypes);
// this is a hook
// sequelize allows ua to interact with the usermodel before adding data to the database using the beforeCreate hook.
userMod.beforeCreate((user) => {
  console.log('this is the user I am about to create', user);
});

module.exports = {
  sequelizeDatabase,
  userModel: userMod,
};
