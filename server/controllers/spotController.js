const spotArbitrageEngine = require('../services/spotArbitrageEngine');

function getSpotOpportunities(req, res) {
  const opportunities = spotArbitrageEngine.getAllOpportunities();
  res.json({
    totalOpportunities: opportunities.length,
    opportunities,
  });
}

module.exports = {
  getSpotOpportunities,
};
