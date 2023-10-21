'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');
const todo = require('./todo.js');
const Collection = require('./collection.js');

const DATABASE_URL =
  process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;
//const users = userSchema(sequelize, Datatypes);
const DATABASE_CONFIG =
  process.env.NODE_ENV === 'production' ? { dialectOptions: {} } : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const todoModel = todo(sequelize, DataTypes);
const todoCollection = new Collection(todoModel);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
  todoCollection,
};
