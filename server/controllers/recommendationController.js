const k8sRightSizingEngine = require('../services/k8sRightSizingEngine');

function getK8sRecommendations(req, res) {
  const recommendations = k8sRightSizingEngine.getAllRecommendations();
  const totalSavings = recommendations.reduce((acc, curr) => acc + curr.monthlySavingsUsd, 0);

  res.json({
    totalRecommendations: recommendations.length,
    totalMonthlySavingsUsd: Number(totalSavings.toFixed(2)),
    recommendations,
  });
}

function calculateCustomWorkload(req, res) {
  try {
    const result = k8sRightSizingEngine.calculateWorkloadOptimization(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getK8sRecommendations,
  calculateCustomWorkload,
};
