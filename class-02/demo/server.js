'use strict';
const express = require('express');
const server = express();
const logger = require('./middleware/logger.js');
const getBrowser = require('./middleware/getBrowser.js');
const handle500 = require('./errorHandling/500.js');

// start function that will be used by index
function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}

// errors
function handle404(req, res, next) {
  const errorObject = {
    status: 404,
    message: 'Sorry, we could not find what you were looking for',
  };

  res.status(404).json(errorObject);
}

// if we want the mw applied to every route we put it on top
server.use(logger);

// GLOBAL Express MW
server.use(express.json());

// write some test that will check the / route for "hello world"
server.get('/', (req, res) => res.send('Hello World'));

// takes in a query string
server.get('/hello', (req, res) => {
  if (!req.query.name) {
    throw new Error('Hey! You were supposed to give us your name!');
  }
  res.send(`Hello, ${req.query.name}`);
});

// req.param a key value pair where the key is defined by our route
server.get('/hello/:person', (req, res) => {
  // error handling maybe
  res.send(`Hello, ${req.params.person}`);
});

// add on to the req.body with a post request
server.post('/hello', (req, res) => {
  // req.body - JSON Object {"key": "value"}
  res.send(`Hello, ${req.body.name}`);
});

// apply the middleware manually to just one route
server.get('/demo', getBrowser, (req, res) => {
  res.send(`You are using ${req.browser}`);
});

server.use('*', handle404);
server.use(handle500);

module.exports = { server, start };
