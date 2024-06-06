const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('Status testing', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'success', message: 'Welcome to the Ngreen API' });
  });
});

describe('GET /database', () => {
  it('Database Status testing', async () => {
    const response = await request(app).get('/database')

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ 'status': 'Database is up and running' });
  });
});

