'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const people = require('./people.model.js');
// new things
// customer and order functions that create the model
const customer = require('./customer.model.js');
const order = require('./order.model.js');
const Collection = require('./collection.js');

// connect to our db this way:
// URI: uniform resource idenifier L: locator
const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;
// there a temporary in memory db created when you use sqlite:memory: it gets erased when you disconnect from the db
let sequelize = new Sequelize(POSTGRES_URI);

// call the functions to make the models
const customerModel = customer(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);

// make the associations
customerModel.hasMany(orderModel, {
  foreignKey: 'customerId',
  sourceKey: 'id',
});
orderModel.belongsTo(customerModel, {
  foreignKey: 'customerId',
  targetKey: 'id',
});

// create a new COLLECTION class for each model
const customerCollection = new Collection(customerModel);
const orderCollection = new Collection(orderModel);

module.exports = {
  dbInstance: sequelize,
  People: people(sequelize, DataTypes),
  customerCollection,
  orderCollection,
};
