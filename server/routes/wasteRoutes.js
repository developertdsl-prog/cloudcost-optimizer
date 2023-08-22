const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

router.get('/api/waste/summary', wasteController.getWasteSummary);
router.post('/api/waste/:resourceId/remediate', wasteController.remediateWasteItem);

module.exports = router;
