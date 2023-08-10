const budgetForecaster = require('../services/budgetForecaster');

describe('Budget Forecaster', () => {
  test('should project month-end spend accurately and detect budget breach', () => {
    // $10,000 budget, $7,000 spent by day 14 of 30 ($500/day burn -> $15,000 projected)
    const forecast = budgetForecaster.forecastMonthEnd(10000, 7000, 14, 30);

    expect(forecast.dailyBurnRateUsd).toBe(500);
    expect(forecast.projectedSpendUsd).toBe(15000);
    expect(forecast.willBreach).toBe(true);
    expect(forecast.status).toBe('BREACHED');
  });

  test('should return healthy status when spending is under budget', () => {
    // $10,000 budget, $2,000 spent by day 15 of 30 ($133.33/day burn -> $4,000 projected)
    const forecast = budgetForecaster.forecastMonthEnd(10000, 2000, 15, 30);

    expect(forecast.willBreach).toBe(false);
    expect(forecast.status).toBe('HEALTHY');
  });
});
