'use strict';

// 3rd Party Resources

const express = require('express');
const bcrypt = require('bcrypt');
const basic = require('./auth/middleware/basic');
const bearer = require('./auth/middleware/bearer');
const acl = require('./auth/middleware/acl.js');
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
    console.error(e);
    res.status(403).send('Error Creating User');
  }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', basic, (req, res) => {
  res.status(200).send(req.user);
});

app.get('/users', bearer, async (req, res) => {
  let allUsers = await userModel.findAll();
  res.status(200).send(allUsers);
});

// add routes that will be permission based off role
app.get('/read', bearer, acl('read'), (req, res) => {
  res.status(200).send('you have read access');
});
app.post('/create', bearer, acl('create'), (req, res) => {
  res.status(200).send('you have create access');
});
app.put('/update', bearer, acl('update'), (req, res) => {
  res.status(200).send('you have update access');
});
app.delete('/delete', bearer, acl('delete'), (req, res) => {
  res.status(200).send('you have delete access');
});

module.exports = app;
