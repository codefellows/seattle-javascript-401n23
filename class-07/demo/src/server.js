'use strict';

// 3rd Party Resources

const express = require('express');
const bcrypt = require('bcrypt');
const basic = require('./auth/middleware/basic');
const bearer = require('./auth/middleware/bearer');
// const { Sequelize, DataTypes } = require('sequelize');
const { userModel } = require('./auth/models');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', basic, (req, res) => {
  res.status(200).send(req.user.token);
});

app.get('/users', bearer, async (req, res) => {
  let allUsers = await userModel.findAll();
  res.status(200).send(allUsers);
});

module.exports = app;
