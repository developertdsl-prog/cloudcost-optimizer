const k8sRightSizingEngine = require('./k8sRightSizingEngine');
const spotArbitrageEngine = require('./spotArbitrageEngine');
const cloudWasteDetector = require('./cloudWasteDetector');

/**
 * Aggregates high-level FinOps KPIs for executive summaries
 */
class MetricsAggregator {
  getExecutiveSummary() {
    const k8sRecs = k8sRightSizingEngine.getAllRecommendations();
    const spotOpps = spotArbitrageEngine.getAllOpportunities();
    const waste = cloudWasteDetector.detectWaste();

    const totalK8sSavings = k8sRecs.reduce((acc, curr) => acc + curr.monthlySavingsUsd, 0);
    const totalSpotAnnual = spotOpps.reduce((acc, curr) => acc + curr.annualSavingsUsd, 0);
    const totalSpotMonthly = totalSpotAnnual / 12;

    const totalPotentialMonthlySavings = totalK8sSavings + totalSpotMonthly + waste.totalMonthlyWasteUsd;
    const totalPotentialAnnualSavings = totalPotentialMonthlySavings * 12;

    return {
      totalMonthlyCloudSpend: 28450.00,
      totalPotentialMonthlySavingsUsd: Number(totalPotentialMonthlySavings.toFixed(2)),
      totalPotentialAnnualSavingsUsd: Number(totalPotentialAnnualSavings.toFixed(2)),
      potentialSavingsPercentage: Number(((totalPotentialMonthlySavings / 28450.00) * 100).toFixed(1)),
      k8sWorkloadSavingsMonthlyUsd: Number(totalK8sSavings.toFixed(2)),
      spotArbitrageMonthlySavingsUsd: Number(totalSpotMonthly.toFixed(2)),
      cloudWasteMonthlyUsd: waste.totalMonthlyWasteUsd,
      wasteItemsCount: waste.wasteItemCount,
      activeAnomaliesCount: 2,
    };
  }
}

module.exports = new MetricsAggregator();
