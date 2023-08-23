const costAnomalyDetector = require('../services/costAnomalyDetector');

function getActiveAnomalies(req, res) {
  const anomalies = costAnomalyDetector.getRecentAnomalies();
  res.json({
    totalActive: anomalies.length,
    anomalies,
  });
}

module.exports = {
  getActiveAnomalies,
};
