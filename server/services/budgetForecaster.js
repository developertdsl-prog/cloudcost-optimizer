/**
 * Linear spend forecaster & budget burn rate calculator
 */
class BudgetForecaster {
  forecastMonthEnd(monthlyBudgetUsd, currentSpendUsd, dayOfMonth, totalDaysInMonth = 30) {
    if (dayOfMonth <= 0) dayOfMonth = 1;

    const dailyBurnRate = currentSpendUsd / dayOfMonth;
    const projectedSpendUsd = Number((dailyBurnRate * totalDaysInMonth).toFixed(2));
    const budgetDeltaUsd = Number((projectedSpendUsd - monthlyBudgetUsd).toFixed(2));
    const willBreach = projectedSpendUsd > monthlyBudgetUsd;

    return {
      monthlyBudgetUsd,
      currentSpendUsd,
      dayOfMonth,
      totalDaysInMonth,
      dailyBurnRateUsd: Number(dailyBurnRate.toFixed(2)),
      projectedSpendUsd,
      budgetDeltaUsd,
      willBreach,
      status: willBreach ? 'BREACHED' : projectedSpendUsd > (monthlyBudgetUsd * 0.9) ? 'AT_RISK' : 'HEALTHY',
    };
  }

  getTeamBudgets() {
    return [
      this.forecastMonthEnd(12000, 7800, 18), // Payments
      this.forecastMonthEnd(8500, 4100, 18),  // Search Core
      this.forecastMonthEnd(15000, 13400, 18), // Data Platform (at risk)
    ];
  }
}

module.exports = new BudgetForecaster();
