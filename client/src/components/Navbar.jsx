function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="brand-section">
        <span className="brand-logo">💰</span>
        <span className="brand-title">CloudCost-Optimizer</span>
        <span className="brand-badge">FinOps Engine v1.0</span>
      </div>

      <div className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'k8s' ? 'active' : ''}`}
          onClick={() => setActiveTab('k8s')}
        >
          K8s Right-Sizing
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'spot' ? 'active' : ''}`}
          onClick={() => setActiveTab('spot')}
        >
          Spot Arbitrage
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'waste' ? 'active' : ''}`}
          onClick={() => setActiveTab('waste')}
        >
          Cloud Waste Discovery
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'anomalies' ? 'active' : ''}`}
          onClick={() => setActiveTab('anomalies')}
        >
          Cost Anomalies
        </button>
      </div>

      <div className="nav-status">
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span>FINOPS ENGINE ACTIVE</span>
        </div>
      </div>
    </nav>
  );
}

window.Navbar = Navbar;
