require('dotenv').config();
const { sequelize } = require('./src/auth/models');
const app = require('./src/server');

// make sure our tables are created, start up the HTTP server.
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log('server up'));
  })
  .catch((e) => {
    console.error('Could not start server', e.message);
  });

// create error handling middleware
// in the future if I add more routes move them into router
