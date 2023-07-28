const k8sRightSizingEngine = require('../services/k8sRightSizingEngine');

describe('K8s Right-Sizing Engine', () => {
  test('should calculate recommended CPU and memory with safety headroom', () => {
    const workload = {
      clusterName: 'test-cluster',
      namespace: 'production',
      deploymentName: 'api-service',
      currentCpuCores: 8.0,
      p95CpuCores: 2.0,
      currentMemoryGb: 16.0,
      p95MemoryGb: 4.0,
      replicas: 5,
      monthlyCostUsd: 1000.0,
    };

    const result = k8sRightSizingEngine.calculateWorkloadOptimization(workload);

    // CPU Headroom: 2.0 * 1.15 = 2.30
    expect(result.recommendedCpuCores).toBe(2.3);
    // Memory Headroom: 4.0 * 1.20 = 4.80
    expect(result.recommendedMemoryGb).toBe(4.8);
    expect(result.monthlySavingsUsd).toBeGreaterThan(500);
    expect(result.overProvisionedPct).toBeGreaterThan(50);
    expect(result.kubectlPatch).toContain('kubectl set resources deployment api-service');
  });

  test('should return all seed workload recommendations', () => {
    const all = k8sRightSizingEngine.getAllRecommendations();
    expect(all.length).toBeGreaterThanOrEqual(4);
    expect(all[0]).toHaveProperty('deploymentName');
    expect(all[0]).toHaveProperty('monthlySavingsUsd');
  });
});
