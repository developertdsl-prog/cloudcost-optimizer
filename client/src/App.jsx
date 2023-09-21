function App() {
  const [activeTab, setActiveTab] = React.useState('k8s');
  const [summary, setSummary] = React.useState({});
  const [recommendations, setRecommendations] = React.useState([]);
  const [opportunities, setOpportunities] = React.useState([]);
  const [waste, setWaste] = React.useState({});
  const [anomalies, setAnomalies] = React.useState([]);

  const loadData = async () => {
    try {
      const sumRes = await window.apiService.getExecutiveSummary();
      if (sumRes.summary) setSummary(sumRes.summary);

      const k8sRes = await window.apiService.getK8sRecommendations();
      if (k8sRes.recommendations) setRecommendations(k8sRes.recommendations);

      const spotRes = await window.apiService.getSpotOpportunities();
      if (spotRes.opportunities) setOpportunities(spotRes.opportunities);

      const wasteRes = await window.apiService.getWasteSummary();
      if (wasteRes) setWaste(wasteRes);

      const anomRes = await window.apiService.getAnomalies();
      if (anomRes.anomalies) setAnomalies(anomRes.anomalies);
    } catch (err) {
      console.error('Failed to load FinOps data:', err);
    }
  };

  const handleRemediate = async (resourceId) => {
    try {
      await window.apiService.remediateWasteItem(resourceId);
      loadData();
    } catch (err) {
      alert(`Error remediating: ${err.message}`);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <FinOpsMetricsOverview summary={summary} />

        {activeTab === 'k8s' && (
          <K8sRightSizingTable recommendations={recommendations} />
        )}

        {activeTab === 'spot' && (
          <SpotArbitragePanel opportunities={opportunities} />
        )}

        {activeTab === 'waste' && (
          <CloudWasteExplorer waste={waste} onRemediate={handleRemediate} />
        )}

        {activeTab === 'anomalies' && (
          <AnomalyAlertsFeed anomalies={anomalies} />
        )}
      </main>
    </div>
  );
}

window.App = App;
