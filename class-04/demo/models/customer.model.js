'use strict';

const customer = (sequalizeInstance, DataTypes) =>
  sequalizeInstance.define('customers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
  });

module.exports = customer;
