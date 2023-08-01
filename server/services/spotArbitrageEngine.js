const { SPOT_ARBITRAGE_THRESHOLDS } = require('../config/costConstants');
const { sampleSpotOpportunities } = require('../utils/seedCloudCost');
const logger = require('../utils/logger');

/**
 * Cross-Cloud Spot Instance Arbitrage Engine
 * Discovers high-discount, low-risk spot instances across AWS, GCP, and Azure
 */
class SpotArbitrageEngine {
  evaluateOpportunity(opportunity) {
    const {
      provider,
      region,
      availabilityZone,
      instanceType,
      onDemandHourlyUsd,
      spotHourlyUsd,
      interruptionRiskPct,
      recommendedWorkload,
    } = opportunity;

    const hourlyDelta = onDemandHourlyUsd - spotHourlyUsd;
    const savingsPct = Number(((hourlyDelta / onDemandHourlyUsd) * 100).toFixed(1));
    const annualSavingsUsd = Number((hourlyDelta * 24 * 365).toFixed(2));

    let arbitrageRating = 'MODERATE';
    if (savingsPct >= 65 && interruptionRiskPct <= 10) {
      arbitrageRating = 'EXCELLENT';
    } else if (savingsPct >= 50 && interruptionRiskPct <= 15) {
      arbitrageRating = 'GOOD';
    }

    return {
      provider,
      region,
      availabilityZone,
      instanceType,
      onDemandHourlyUsd,
      spotHourlyUsd,
      savingsPct,
      annualSavingsUsd,
      interruptionRiskPct,
      recommendedWorkload,
      arbitrageRating,
      eligibleForArbitrage: savingsPct >= SPOT_ARBITRAGE_THRESHOLDS.MIN_SAVINGS_PERCENT &&
                            interruptionRiskPct <= SPOT_ARBITRAGE_THRESHOLDS.MAX_INTERRUPTION_RISK,
    };
  }

  getAllOpportunities() {
    return sampleSpotOpportunities.map(opp => this.evaluateOpportunity(opp));
  }
}

module.exports = new SpotArbitrageEngine();
