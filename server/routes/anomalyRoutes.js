const express = require('express');
const router = express.Router();
const anomalyController = require('../controllers/anomalyController');

router.get('/api/anomalies', anomalyController.getActiveAnomalies);

module.exports = router;
