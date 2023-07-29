'use strict';
// import the app
const { app } = require('../src/server');
// import supertest
const supertest = require('supertest');
// import db
const { db } = require('../src/models');
const mockServer = supertest(app);

beforeAll(async () => {
  db.sync();
});

afterAll(async () => {
  db.drop({});
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2NTE1ODl9.IMsx0gxfuUK3J2JP6bbYImLOGjlyfsTtDDwzH3HaXXk

describe('Auth routes work as expected', () => {
  test('we can create a new user', async () => {
    const response = await mockServer
      .post('/signup')
      .send({ username: 'test', password: '123', role: 'admin' });

    expect(response.status).toEqual(201);
  });
  test('we can sign in as our user', async () => {
    const response = await mockServer.post('/signin').auth('test', '123');
    console.log(response.body.user.username);
    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe('test');
  });

  test('we can make a request to /users', async () => {
    const response = await mockServer
      .get('/users')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2NTE1ODl9.IMsx0gxfuUK3J2JP6bbYImLOGjlyfsTtDDwzH3HaXXk'
      );
    expect(response.status).toBe(200);
  });
});
