'use strict';
const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/config/database', () => ({ query: jest.fn() }));
jest.mock('bcrypt', () => ({ hash: jest.fn().mockResolvedValue('hash'), compare: jest.fn() }));

describe('POST /api/v1/auth/register', () => {
  it('returns 400 when body is empty', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({});
    expect(res.status).toBe(400);
  });
});

describe('POST /api/v1/auth/login', () => {
  it('returns 401 with wrong credentials', async () => {
    const { query } = require('../src/config/database');
    query.mockResolvedValue({ rows: [] });
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'x@x.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });
});
