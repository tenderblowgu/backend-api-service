'use strict';
const request = require('supertest');
const app = require('../src/index');

jest.mock('../src/config/database', () => ({ query: jest.fn() }));

describe('GET /api/v1/products', () => {
  it('returns product list', async () => {
    const { query } = require('../src/config/database');
    query.mockResolvedValue({ rows: [{ id: 1, name: 'Widget', price: 9.99 }] });
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(1);
  });
});

describe('GET /api/v1/products/:id', () => {
  it('returns 404 for unknown id', async () => {
    const { query } = require('../src/config/database');
    query.mockResolvedValue({ rows: [] });
    const res = await request(app).get('/api/v1/products/999');
    expect(res.status).toBe(404);
  });
});
