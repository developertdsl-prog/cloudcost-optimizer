function FinOpsMetricsOverview({ summary = {} }) {
  return (
    <div className="metrics-grid">
      <div className="kpi-card">
        <div className="kpi-title">Monthly Cloud Spend</div>
        <div className="kpi-value">{window.formatters.formatCurrency(summary.totalMonthlyCloudSpend || 28450)}</div>
        <div className="kpi-subtext">AWS &bull; GCP &bull; Azure</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-title">Identified Monthly Savings</div>
        <div className="kpi-value" style={{ color: 'var(--accent-emerald)' }}>
          {window.formatters.formatCurrency(summary.totalPotentialMonthlySavingsUsd || 3420)}
        </div>
        <div className="kpi-subtext">Save {summary.potentialSavingsPercentage || 12.0}% of total bill</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-title">Annualized Projection</div>
        <div className="kpi-value">
          {window.formatters.formatCurrency(summary.totalPotentialAnnualSavingsUsd || 41040)}
        </div>
        <div className="kpi-subtext">12-Month Net Cost Reduction</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-title">Active Zombie Resources</div>
        <div className="kpi-value">{summary.wasteItemsCount || 4}</div>
        <div className="kpi-subtext">{summary.activeAnomaliesCount || 2} Active Anomaly Alerts</div>
      </div>
    </div>
  );
}

window.FinOpsMetricsOverview = FinOpsMetricsOverview;
