require('dotenv').config();
const { start } = require('./server.js');
// const { dbConnectionString } = require('./models');
const { dbInstance } = require('./models/index.js');
const PORT = process.env.PORT || 3000;

// add some code to connect to the database
// get knowledge of any models currently in our code and not in our db and visa versa
dbInstance
  .sync()
  .then(() => {
    start(PORT);
  })
  .catch(console.error);
