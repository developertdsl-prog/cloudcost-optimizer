const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const { validateK8sWorkload } = require('../middleware/finOpsValidator');

router.get('/api/recommendations/k8s', recommendationController.getK8sRecommendations);
router.post('/api/recommendations/k8s/calculate', validateK8sWorkload, recommendationController.calculateCustomWorkload);

module.exports = router;
