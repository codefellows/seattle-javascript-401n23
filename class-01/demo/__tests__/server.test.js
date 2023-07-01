'use strict';
// import supertest a lib that lets us mock a server connection/request (like .listen)
// import jest
const supertest = require('supertest');
const server = require('../server.js');

const request = supertest(server);

// jest convention pattern of describe, test, expect
describe('basic server functions as expected', () => {
  // all the individual tests for this suite live here
  test('request to goodbye route sends string goodbye', async () => {
    const response = await request.get('/goodbye');
    expect(response.text).toBe('goodbye');
  });
  test('request to hello route sends string hello with a timestap', async () => {
    const response = await request.get('/hello');
    expect(response.text).toContain('hello');
  });
  test('handles undefined routes', async () => {
    const response = await request.get('/pizza');
    expect(response.status).toEqual(404);
  });
});
