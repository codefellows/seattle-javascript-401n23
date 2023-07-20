const { Sequelize, DataTypes } = require('sequelize');

const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const sequelize = new Sequelize(POSTGRES_URI);
// Create a Sequelize model
// move this to the user.model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { sequelize, Users };
