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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2NTIwNTN9.0LGnR1YsblULTli1469gMphXK52EA3ITInZxd5UNkrA

describe('v2 routes work as expected', () => {
  test('we can create a new user to get a token', async () => {
    const response = await mockServer
      .post('/signup')
      .send({ username: 'test', password: '123', role: 'admin' });
    console.log(response.body.user.token);
    expect(response.status).toEqual(201);
  });
  test('we can create a food with a valid user', async () => {
    const response = await mockServer
      .post('/api/v2/food')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2NTIwNTN9.0LGnR1YsblULTli1469gMphXK52EA3ITInZxd5UNkrA'
      )
      .send({ name: 'radish', calories: 10, type: 'vegetable' });
    expect(response.status).toBe(201);
  });
  test('we can create a food with a valid user', async () => {
    const response = await mockServer
      .get('/api/v2/food')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2NTIwNTN9.0LGnR1YsblULTli1469gMphXK52EA3ITInZxd5UNkrA'
      );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
