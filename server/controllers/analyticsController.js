const metricsAggregator = require('../services/metricsAggregator');
const budgetForecaster = require('../services/budgetForecaster');

function getExecutiveOverview(req, res) {
  const summary = metricsAggregator.getExecutiveSummary();
  const budgets = budgetForecaster.getTeamBudgets();

  res.json({
    summary,
    budgets,
  });
}

module.exports = {
  getExecutiveOverview,
};
