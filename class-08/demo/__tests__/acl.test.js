'use strict';
require('dotenv').config();
const app = require('../src/server.js');
const supertest = require('supertest');
const { sequelize, userModel } = require('../src/auth/models');
const mockServer = supertest(app);

// define a user to test
let testWriter;
// before all sync up the db and create the user in the db to test against
beforeAll(async () => {
  await sequelize.sync();
  testWriter = await userModel.create({
    username: 'Writer',
    password: '1234',
    role: 'writer',
  });
});
// after all drop the table
afterAll(async () => {
  await sequelize.drop();
});

// write some tests based on the mock user
// /read /create /update /delete
// testWrite = read/create
describe('ACL Integration', () => {
  test('the user should be able to access the read route', async () => {
    let response = await mockServer
      .get('/read')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('you have read access');
    // basic can set the header with the .auth property in supertest
    // for bearer we have to use .set('Authorization', `Bearer ${testWriter.token}`)
    // console.log(testWriter.token);
  });
  test('the user should be able to access the create route', async () => {
    let response = await mockServer
      .post('/create')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('you have create access');
    // basic can set the header with the .auth property in supertest
    // for bearer we have to use .set('Authorization', `Bearer ${testWriter.token}`)
    // console.log(testWriter.token);
  });
  test('the user should not be able to access the update route', async () => {
    let response = await mockServer
      .put('/update')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(500);

    // basic can set the header with the .auth property in supertest
    // for bearer we have to use .set('Authorization', `Bearer ${testWriter.token}`)
    // console.log(testWriter.token);
  });
  test('the user should not be able to access the delete route', async () => {
    let response = await mockServer
      .delete('/delete')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(500);

    // basic can set the header with the .auth property in supertest
    // for bearer we have to use .set('Authorization', `Bearer ${testWriter.token}`)
    // console.log(testWriter.token);
  });
});
