const { sampleCloudWaste } = require('../utils/seedCloudCost');
const logger = require('../utils/logger');

/**
 * Cloud Waste & Zombie Resource Detector
 * Identifies unattached EBS volumes, orphaned snapshots, idle IPs, and dormant load balancers
 */
class CloudWasteDetector {
  constructor() {
    this.wasteStore = [...sampleCloudWaste];
  }

  detectWaste() {
    const totalMonthlyWaste = this.wasteStore.reduce((acc, curr) => acc + curr.monthlyCostUsd, 0);

    const byType = {};
    for (const item of this.wasteStore) {
      byType[item.resourceType] = (byType[item.resourceType] || 0) + item.monthlyCostUsd;
    }

    return {
      totalMonthlyWasteUsd: Number(totalMonthlyWaste.toFixed(2)),
      annualWasteProjectionUsd: Number((totalMonthlyWaste * 12).toFixed(2)),
      wasteItemCount: this.wasteStore.length,
      wasteByType: byType,
      items: this.wasteStore,
    };
  }

  remediateItem(resourceId) {
    const idx = this.wasteStore.findIndex(i => i.resourceId === resourceId);
    if (idx === -1) {
      throw new Error(`Resource ${resourceId} not found in waste store`);
    }

    const removed = this.wasteStore.splice(idx, 1)[0];
    logger.info(`Remediated cloud waste item [${resourceId}] saving $${removed.monthlyCostUsd}/mo`);
    return removed;
  }
}

module.exports = new CloudWasteDetector();
