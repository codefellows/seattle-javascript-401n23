'use strict';

const order = (sequalizeInstance, DataTypes) =>
  sequalizeInstance.define('orders', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = order;
