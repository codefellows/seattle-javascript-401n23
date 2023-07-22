const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./user.model');

const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const sequelize = new Sequelize(POSTGRES_URI);

const userModel = userSchema(sequelize, DataTypes);

module.exports = { sequelize, userModel };
