/**
 * Global configuration constants for Multi-Cloud FinOps Optimization
 */

module.exports = {
  CLOUD_PROVIDERS: {
    AWS: 'AWS',
    GCP: 'GCP',
    AZURE: 'AZURE',
  },
  DEFAULT_HEADROOM: {
    CPU_PERCENT: 15,     // 15% safety buffer above P95
    MEMORY_PERCENT: 20,  // 20% safety buffer above P95
  },
  SPOT_ARBITRAGE_THRESHOLDS: {
    MIN_SAVINGS_PERCENT: 50,  // Must save at least 50% vs on-demand
    MAX_INTERRUPTION_RISK: 15, // Interruption probability must be <= 15%
  },
  WASTE_TYPES: {
    UNATTACHED_DISK: 'UNATTACHED_DISK',
    IDLE_IP: 'IDLE_STATIC_IP',
    ORPHANED_SNAPSHOT: 'ORPHANED_SNAPSHOT',
    IDLE_LOAD_BALANCER: 'IDLE_LOAD_BALANCER',
  },
  ANOMALY_SENSITIVITY: {
    SIGMA_MULTIPLIER: 2.5,
    MIN_SPIKE_AMOUNT_USD: 100,
  },
};
