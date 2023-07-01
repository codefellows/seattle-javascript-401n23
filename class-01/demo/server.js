'use strict';
// express is the lib we imported for server methods and code
const express = require('express');
// dotenv allows us to read from a env file
// const { config } = require('dotenv');
// config();
// const PORT = process.env.PORT;

const server = express();
const pageNotFoundHandler = require('./routeErrorHandlers/404.js');
const errorHandler = require('./routeErrorHandlers/500.js');
const stamper = require('./middleware/stamper.js');

// // error handling functions
// const pageNotFoundHandler = (req, res) => {
//   res.status(404).send({
//     error: 404,
//     route: req.path,
//     message: 'no data on this route',
//   });
// };

// // 500
// const errorHandler = (error, req, res, next) => {
//   res.status(500).send({
//     error: 500,
//     route: req.path,
//     query: req.query,
//     body: req.body,
//     message: `SERVER ERROR: ${error.message}`,
//   });
// };

// // middleware does something with the request that comes in before sending back a response
// const stamper = (req, res, next) => {
//   req.timestamp = new Date();
//   next();
// };

// hello
server.get('/hello', stamper, (req, res) => res.send(`hello ${req.timestamp}`));
// goodbye
server.get('/goodbye', (_, res) => res.send('goodbye'));
// a error or bad route
server.get('/bad', (req, res, next) =>
  next({ message: 'this is a bad route' })
);

// server.get('/reallybad', (req, res, next) => res.status(500).error());
// callback function that is the second argument to an express route can take a 3rd argument called next -> passes info to the next process that occurs

// invalid routes
// can do this two ways
// server.get("/*", handle the route)
server.use('*', pageNotFoundHandler);
server.use(errorHandler);

// server.listen(PORT, () => console.log('I am alive on port ', PORT));
module.exports = server;
