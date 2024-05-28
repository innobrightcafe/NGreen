const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('Status testing', async () => {
    const response = await request(app)
      .get('/')

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'success', message: 'Welcome to the Ngreen API' });
  });
});

