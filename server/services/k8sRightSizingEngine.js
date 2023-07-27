const { DEFAULT_HEADROOM } = require('../config/costConstants');
const { sampleK8sWorkloads } = require('../utils/seedCloudCost');
const logger = require('../utils/logger');

/**
 * Kubernetes Pod Right-Sizing Engine
 * Applies P95 curve analysis and safety buffers to eliminate over-provisioned CPU and RAM
 */
class K8sRightSizingEngine {
  constructor(headroomCpuPct = DEFAULT_HEADROOM.CPU_PERCENT, headroomMemPct = DEFAULT_HEADROOM.MEMORY_PERCENT) {
    this.headroomCpuFactor = 1 + (headroomCpuPct / 100);
    this.headroomMemFactor = 1 + (headroomMemPct / 100);
  }

  calculateWorkloadOptimization(workload) {
    const {
      clusterName,
      namespace,
      deploymentName,
      currentCpuCores,
      p95CpuCores,
      currentMemoryGb,
      p95MemoryGb,
      replicas = 1,
      monthlyCostUsd = 100.0,
    } = workload;

    // Recommended allocation with safety headroom
    const recommendedCpuCores = Math.max(0.1, Number((p95CpuCores * this.headroomCpuFactor).toFixed(2)));
    const recommendedMemoryGb = Math.max(0.25, Number((p95MemoryGb * this.headroomMemFactor).toFixed(2)));

    // Savings percentage
    const cpuReductionRatio = Math.max(0, (currentCpuCores - recommendedCpuCores) / currentCpuCores);
    const memReductionRatio = Math.max(0, (currentMemoryGb - recommendedMemoryGb) / currentMemoryGb);

    // Blended compute savings (weighted 60% CPU, 40% RAM)
    const blendedReductionRatio = (cpuReductionRatio * 0.6) + (memReductionRatio * 0.4);
    const monthlySavingsUsd = Number((monthlyCostUsd * blendedReductionRatio).toFixed(2));
    const overProvisionedPct = Number((blendedReductionRatio * 100).toFixed(1));

    const kubectlPatch = `kubectl set resources deployment ${deploymentName} -n ${namespace} --requests=cpu=${recommendedCpuCores},memory=${recommendedMemoryGb}Gi`;

    return {
      clusterName,
      namespace,
      deploymentName,
      currentCpuCores,
      recommendedCpuCores,
      currentMemoryGb,
      recommendedMemoryGb,
      replicas,
      monthlyCostUsd,
      monthlySavingsUsd,
      overProvisionedPct,
      kubectlPatch,
      status: 'PENDING',
    };
  }

  getAllRecommendations() {
    return sampleK8sWorkloads.map(w => this.calculateWorkloadOptimization(w));
  }
}

module.exports = new K8sRightSizingEngine();
