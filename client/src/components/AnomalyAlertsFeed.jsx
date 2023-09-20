function AnomalyAlertsFeed({ anomalies = [] }) {
  return (
    <div className="table-container">
      <h2>Statistical Cost Anomaly Alerts (2.5&sigma; Spikes)</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
        Sudden deviations exceeding the 14-day rolling baseline moving average.
      </p>

      <table className="finops-table">
        <thead>
          <tr>
            <th>Provider &bull; Service</th>
            <th>Baseline &rarr; Actual Daily</th>
            <th>Spike</th>
            <th>Severity</th>
            <th>Root Cause Investigation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {anomalies.map((anom) => (
            <tr key={anom.id || anom.serviceName}>
              <td><strong>{anom.provider}</strong> &bull; {anom.serviceName}</td>
              <td>${anom.baselineDailyCostUsd} &rarr; <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>${anom.actualDailyCostUsd}</span></td>
              <td><span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>+{anom.spikePercentage}%</span></td>
              <td>
                <span className="badge-risk high">{anom.severity}</span>
              </td>
              <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {anom.rootCauseSuspect}
              </td>
              <td><code>{anom.status}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.AnomalyAlertsFeed = AnomalyAlertsFeed;
