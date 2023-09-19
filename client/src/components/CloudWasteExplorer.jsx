function CloudWasteExplorer({ waste, onRemediate }) {
  if (!waste || !waste.items) {
    return <div className="table-container">Loading Cloud Waste Data...</div>;
  }

  return (
    <div className="table-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Zombie Assets & Cloud Waste Inventory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
            Unattached persistent volumes, idle elastic IPs, and orphaned snapshots incurring ongoing costs.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOTAL MONTHLY WASTE</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-red)' }}>
            {window.formatters.formatCurrency(waste.totalMonthlyWasteUsd)} / mo
          </div>
        </div>
      </div>

      <table className="finops-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Resource ID</th>
            <th>Waste Category</th>
            <th>Age</th>
            <th>Monthly Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {waste.items.map((item) => (
            <tr key={item.resourceId}>
              <td><strong>{item.provider}</strong></td>
              <td><code>{item.resourceId}</code></td>
              <td><span style={{ color: 'var(--accent-amber)' }}>{item.resourceType}</span></td>
              <td>{item.ageDays} days dormant</td>
              <td style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>
                {window.formatters.formatCurrency(item.monthlyCostUsd)}
              </td>
              <td>
                <button
                  className="btn-action"
                  style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', borderColor: '#991b1b' }}
                  onClick={() => onRemediate(item.resourceId)}
                >
                  Eliminate Waste
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.CloudWasteExplorer = CloudWasteExplorer;
