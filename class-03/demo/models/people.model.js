'use strict';

// creating a people table
// where am I putting the table (in what db connection)
// what are data types
const People = (dbInstance, DataTypes) =>
  dbInstance.define('People', {
    firstName: {
      type: DataTypes.STRING,
      // if you want the info to be REQUIRED
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  });

module.exports = People;

// single line functions have an implied return
// const super = () => "super"
// const super = () => { return "super"}
