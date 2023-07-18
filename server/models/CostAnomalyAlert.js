const mongoose = require('mongoose');

const CostAnomalyAlertSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['AWS', 'GCP', 'AZURE'],
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  baselineDailyCostUsd: {
    type: Number,
    required: true,
  },
  actualDailyCostUsd: {
    type: Number,
    required: true,
  },
  spikePercentage: {
    type: Number,
    required: true,
  },
  severity: {
    type: String,
    enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
    default: 'HIGH',
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INVESTIGATING', 'RESOLVED'],
    default: 'ACTIVE',
  },
  rootCauseSuspect: {
    type: String,
  },
  detectedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.CostAnomalyAlert || mongoose.model('CostAnomalyAlert', CostAnomalyAlertSchema);
