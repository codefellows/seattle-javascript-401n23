'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const people = require('./people.model.js');

// connect to our db this way:
// URI: uniform resource idenifier L: locator
const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;
// there a temporary in memory db created when you use sqlite:memory: it gets erased when you disconnect from the db
let sequelize = new Sequelize(POSTGRES_URI);

module.exports = {
  dbInstance: sequelize,
  People: people(sequelize, DataTypes),
};
