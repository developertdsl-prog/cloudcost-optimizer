const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/api/analytics/executive-summary', analyticsController.getExecutiveOverview);

module.exports = router;
