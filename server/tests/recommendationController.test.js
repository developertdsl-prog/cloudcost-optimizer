const request = require('supertest');
const { app } = require('../server');

describe('FinOps Recommendation HTTP API', () => {
  test('GET /api/health should return HEALTHY status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('HEALTHY');
  });

  test('GET /api/recommendations/k8s should return right-sizing list', async () => {
    const res = await request(app).get('/api/recommendations/k8s');
    expect(res.status).toBe(200);
    expect(res.body.recommendations).toBeInstanceOf(Array);
    expect(res.body.totalMonthlySavingsUsd).toBeGreaterThan(0);
  });

  test('POST /api/recommendations/k8s/calculate should reject negative values', async () => {
    const res = await request(app)
      .post('/api/recommendations/k8s/calculate')
      .send({ currentCpuCores: -4.0 });

    expect(res.status).toBe(400);
  });
});
