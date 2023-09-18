function SpotArbitragePanel({ opportunities = [] }) {
  return (
    <div className="table-container">
      <h2>Multi-Cloud Spot Instance Arbitrage Market</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
        Real-time spot price arbitrage vs on-demand rates with historical interruption risk scoring.
      </p>

      <table className="finops-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Region / AZ</th>
            <th>Instance Type</th>
            <th>On-Demand &rarr; Spot</th>
            <th>Discount</th>
            <th>Interruption Risk</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp, idx) => (
            <tr key={idx}>
              <td><strong>{opp.provider}</strong></td>
              <td><code>{opp.region} ({opp.availabilityZone})</code></td>
              <td><code>{opp.instanceType}</code></td>
              <td>${opp.onDemandHourlyUsd}/hr &rarr; <strong style={{ color: 'var(--accent-emerald)' }}>${opp.spotHourlyUsd}/hr</strong></td>
              <td><span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>{opp.savingsPct}% OFF</span></td>
              <td>
                <span className={`badge-risk ${opp.interruptionRiskPct <= 10 ? 'low' : 'high'}`}>
                  {opp.interruptionRiskPct}% risk
                </span>
              </td>
              <td>
                <span style={{ fontWeight: 'bold', color: opp.arbitrageRating === 'EXCELLENT' ? 'var(--accent-emerald)' : 'var(--accent-cyan)' }}>
                  {opp.arbitrageRating}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.SpotArbitragePanel = SpotArbitragePanel;
