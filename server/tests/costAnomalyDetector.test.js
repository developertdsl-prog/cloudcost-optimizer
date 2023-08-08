const costAnomalyDetector = require('../services/costAnomalyDetector');

describe('Cost Anomaly Detector', () => {
  test('should not trigger anomalies on normal spending variance', () => {
    const baselineSeries = [
      { date: '2023-08-01', costUsd: 100 },
      { date: '2023-08-02', costUsd: 105 },
      { date: '2023-08-03', costUsd: 98 },
      { date: '2023-08-04', costUsd: 102 },
      { date: '2023-08-05', costUsd: 104 },
    ];

    const anomalies = costAnomalyDetector.detectAnomalies(baselineSeries);
    expect(anomalies.length).toBe(0);
  });

  test('should flag 2.5-sigma cost spike with CRITICAL severity', () => {
    const spikeSeries = [
      { date: '2023-08-01', costUsd: 50 },
      { date: '2023-08-02', costUsd: 52 },
      { date: '2023-08-03', costUsd: 48 },
      { date: '2023-08-04', costUsd: 51 },
      { date: '2023-08-05', costUsd: 49 },
      { date: '2023-08-06', costUsd: 380, serviceName: 'NAT-Gateway', provider: 'AWS' }, // Massive 7x spike
    ];

    const anomalies = costAnomalyDetector.detectAnomalies(spikeSeries);
    expect(anomalies.length).toBe(1);
    expect(anomalies[0].serviceName).toBe('NAT-Gateway');
    expect(anomalies[0].severity).toBe('CRITICAL');
  });
});
