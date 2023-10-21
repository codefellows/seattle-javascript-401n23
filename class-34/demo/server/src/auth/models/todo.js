'use strict';

const todo = (sequalizeInstance, DataTypes) =>
  sequalizeInstance.define('todos', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = todo;
