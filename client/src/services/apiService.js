/**
 * REST API client for CloudCost-Optimizer
 */
const apiService = {
  async getExecutiveSummary() {
    const res = await fetch('/api/analytics/executive-summary');
    return res.json();
  },

  async getK8sRecommendations() {
    const res = await fetch('/api/recommendations/k8s');
    return res.json();
  },

  async getSpotOpportunities() {
    const res = await fetch('/api/spot/opportunities');
    return res.json();
  },

  async getWasteSummary() {
    const res = await fetch('/api/waste/summary');
    return res.json();
  },

  async remediateWasteItem(resourceId) {
    const res = await fetch(`/api/waste/${resourceId}/remediate`, {
      method: 'POST',
    });
    return res.json();
  },

  async getAnomalies() {
    const res = await fetch('/api/anomalies');
    return res.json();
  },
};

window.apiService = apiService;
