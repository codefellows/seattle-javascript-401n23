'use strict';
const express = require('express');
const server = express();
const logger = require('./middleware/logger.js');
// const getBrowser = require('./middleware/getBrowser.js');
const handle500 = require('./errorHandling/500.js');
const handle404 = require('./errorHandling/404.js');
const peopleRoutes = require('./routes/people.route.js');
const customerRoutes = require('./routes/customers.route.js');
const orderRoutes = require('./routes/orders.route.js');

// start function that will be used by index
function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}

// if we want the mw applied to every route we put it on top
server.use(logger);

// GLOBAL Express MW
server.use(express.json());

// write some test that will check the / route for "hello world"
server.get('/', (req, res) => res.send('Hello World'));

server.use(peopleRoutes);
server.use(customerRoutes);
server.use(orderRoutes);

server.use('*', handle404);
server.use(handle500);

module.exports = { server, start };
