const request = require('supertest');
const { app } = require('../server');

describe('End-to-End FinOps Optimization Workflow', () => {
  test('should aggregate multi-cloud metrics and execute waste remediation', async () => {
    // 1. Get executive summary
    const summaryRes = await request(app).get('/api/analytics/executive-summary');
    expect(summaryRes.status).toBe(200);
    expect(summaryRes.body.summary.totalPotentialMonthlySavingsUsd).toBeGreaterThan(1000);

    // 2. Query spot opportunities
    const spotRes = await request(app).get('/api/spot/opportunities');
    expect(spotRes.status).toBe(200);
    expect(spotRes.body.opportunities.length).toBeGreaterThanOrEqual(4);

    // 3. Query waste summary
    const wasteRes = await request(app).get('/api/waste/summary');
    expect(wasteRes.status).toBe(200);
    expect(wasteRes.body.items.length).toBeGreaterThan(0);

    // 4. Remediate waste item
    const targetResource = wasteRes.body.items[0];
    const remediateRes = await request(app)
      .post(`/api/waste/${targetResource.resourceId}/remediate`);
    expect(remediateRes.status).toBe(200);
    expect(remediateRes.body.remediated.resourceId).toBe(targetResource.resourceId);

    // 5. Query active anomalies
    const anomRes = await request(app).get('/api/anomalies');
    expect(anomRes.status).toBe(200);
    expect(anomRes.body.anomalies.length).toBeGreaterThan(0);
  });
});
