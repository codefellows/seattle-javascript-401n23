'use strict';
require('dotenv').config();
// POST to /signup to create a new user.
// when we send a req to /signup {password username} via req.body route and get back status: 200 and object: user object made from the model based on the data we sent
// POST to /signin to login as a user (use basic auth).
// when we send a req to /signin we will include the encoded username:password on the Basic auth object... we will get back status 200 object: user object made from the model based on the data we sent
// Need tests for auth middleware and the routes.
// Does the middleware function (send it a basic header).
// Do the routes assert the requirements (signup/signin).

const server = require('../src/server');
const supertest = require('supertest');
const mockServer = supertest(server);
const { sequelize } = require('../src/auth/models');

const user1 = { username: 'sara', password: 'pizzaRules' };
// const user2 = { username: 'joshua', password: 'pineapplePizza' };

beforeAll(async (done) => {
  await sequelize.sync();
  done();
});
afterAll(async (done) => {
  await sequelize.drop();
  done();
});

describe('test the server routes and db', () => {
  test('we can post a new user to /signup', async () => {
    // when we send a req to /signup {password username} via req.body route and get back status: 200 and object: user object made from the model based on the data we sent
    // req.body = user1;
    const res = await mockServer.post('/signup').send(user1);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text).username).toBe('sara');
    expect(JSON.parse(res.text).password).toBeTruthy();
  });
  test('we can send a user via basic auth to /signin', async () => {
    // must be a user we have ^^^ added already
    const res = await mockServer
      .post('/signin')
      .auth(user1.username, user1.password);

    expect(res.status).toBe(200);
    expect(JSON.parse(res.text).username).toBe('sara');
    expect(JSON.parse(res.text).password).toBeTruthy();
  });
});
