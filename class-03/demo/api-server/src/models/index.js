'use strict';

// connects to our database depending on the URI set as an environment variable, 
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');

let sequelize = new Sequelize(POSTGRES_URI);

// our schema definitions
const people = require('./people.model.js');

module.exports = {
  // exporting sequelize instance and Models configuring your data layer.
  db: sequelize,
  People: people(sequelize, DataTypes),
};
