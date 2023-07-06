require('dotenv').config();
const { start } = require('./server.js');
const PORT = process.env.PORT || 3000;
start(PORT);
