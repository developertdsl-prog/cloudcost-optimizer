const spotArbitrageEngine = require('../services/spotArbitrageEngine');

describe('Spot Arbitrage Engine', () => {
  test('should evaluate spot vs on-demand savings and risk rating', () => {
    const opp = {
      provider: 'AWS',
      region: 'us-east-1',
      availabilityZone: 'us-east-1a',
      instanceType: 'm5.2xlarge',
      onDemandHourlyUsd: 0.384,
      spotHourlyUsd: 0.115,
      interruptionRiskPct: 6.0,
      recommendedWorkload: 'batch-worker',
    };

    const result = spotArbitrageEngine.evaluateOpportunity(opp);

    expect(result.savingsPct).toBe(70.1);
    expect(result.annualSavingsUsd).toBeGreaterThan(2000);
    expect(result.arbitrageRating).toBe('EXCELLENT');
    expect(result.eligibleForArbitrage).toBe(true);
  });

  test('should return all seed spot opportunities', () => {
    const all = spotArbitrageEngine.getAllOpportunities();
    expect(all.length).toBeGreaterThanOrEqual(4);
    expect(all[0]).toHaveProperty('instanceType');
  });
});
