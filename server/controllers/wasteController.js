const cloudWasteDetector = require('../services/cloudWasteDetector');

function getWasteSummary(req, res) {
  const summary = cloudWasteDetector.detectWaste();
  res.json(summary);
}

function remediateWasteItem(req, res) {
  const { resourceId } = req.params;
  try {
    const remediated = cloudWasteDetector.remediateItem(resourceId);
    res.json({
      message: `Successfully remediated waste resource ${resourceId}`,
      remediated,
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getWasteSummary,
  remediateWasteItem,
};
