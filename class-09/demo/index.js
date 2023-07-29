'use strict';

require('dotenv').config();
const { db } = require('./src/models');
// make sure I import the server with the correct export name
const server = require('./src/server.js');

db.sync().then(() => {
  server.start(process.env.PORT || 3001);
});
