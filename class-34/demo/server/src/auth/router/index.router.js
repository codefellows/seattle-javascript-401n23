'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

// GET /todo: Gets a list of all items.
// ‘POST /todo’: Adds an item.
// ‘PUT /todo’: Updates an item (you’ll use this to mark them as complete).
// ‘DELETE /todo/:id’ : Deletes an item.
// authRouter.get('/todo', bearerAuth, handleTodo)

module.exports = authRouter;
