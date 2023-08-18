const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController');

router.get('/api/spot/opportunities', spotController.getSpotOpportunities);

module.exports = router;
