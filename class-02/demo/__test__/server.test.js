'use strict';

const supertest = require('supertest');
const { server } = require('../server.js');
const mockRequest = supertest(server);

describe('server routes and functionality', () => {
  test('the / route will send a response of Hello World', async () => {
    const response = await mockRequest.get('/');
    expect(response.text).toBe('Hello World');
  });
});
