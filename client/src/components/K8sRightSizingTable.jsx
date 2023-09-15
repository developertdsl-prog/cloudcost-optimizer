function K8sRightSizingTable({ recommendations = [] }) {
  const [copiedId, setCopiedId] = React.useState(null);

  const copyPatch = (patch, depName) => {
    navigator.clipboard.writeText(patch);
    setCopiedId(depName);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="table-container">
      <h2>Kubernetes Workload Right-Sizing Recommendations</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
        Allocations calculated using historical 14-day P95 utilization curves + 15% safety headroom.
      </p>

      <table className="finops-table">
        <thead>
          <tr>
            <th>Deployment</th>
            <th>Namespace</th>
            <th>CPU Current &rarr; Recommended</th>
            <th>RAM Current &rarr; Recommended</th>
            <th>Monthly Savings</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec) => (
            <tr key={rec.deploymentName}>
              <td><strong>{rec.deploymentName}</strong></td>
              <td><code>{rec.namespace}</code></td>
              <td>{rec.currentCpuCores} &rarr; <span style={{ color: 'var(--accent-emerald)' }}>{rec.recommendedCpuCores} cores</span></td>
              <td>{rec.currentMemoryGb}GB &rarr; <span style={{ color: 'var(--accent-emerald)' }}>{rec.recommendedMemoryGb}GB</span></td>
              <td style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>
                {window.formatters.formatCurrency(rec.monthlySavingsUsd)} / mo
              </td>
              <td>
                <button
                  className="btn-action"
                  onClick={() => copyPatch(rec.kubectlPatch, rec.deploymentName)}
                >
                  {copiedId === rec.deploymentName ? '✓ Copied kubectl' : 'Copy kubectl Patch'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.K8sRightSizingTable = K8sRightSizingTable;
