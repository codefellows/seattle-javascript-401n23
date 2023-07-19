const userModel = (sequelizeDatabase, DataTypes) =>
  sequelizeDatabase.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

// // this is a hook
// // sequelize allows ua to interact with the usermodel before adding data to the database using the beforeCreate hook.
// userModel.beforeCreate((user) => {
//   console.log('this is the user I am about to create', user);
// });

module.exports = userModel;
