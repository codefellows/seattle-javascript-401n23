require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { userModel } = require('./models');
const basicAuth = require('./middleware/basicAuth.js');

const server = express();

server.use(express.json());

// this allows us to accept webform data  aka process FORM input and add to request body
server.use(express.urlencoded({ extended: true }));

server.post('/signup', async (req, res, next) => {
  try {
    // they are creating a new account
    const { username, password } = req.body;
    const encryptedPW = await bcrypt.hash(password, 5);
    // save to the db
    let newUser = await userModel.create({ username, password: encryptedPW });
    res.status(200).send(newUser);
  } catch (e) {
    next('signup error occured');
  }
});

server.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = server;
