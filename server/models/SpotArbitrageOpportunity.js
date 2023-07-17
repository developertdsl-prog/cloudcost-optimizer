const mongoose = require('mongoose');

const SpotArbitrageOpportunitySchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['AWS', 'GCP', 'AZURE'],
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  availabilityZone: {
    type: String,
    required: true,
  },
  instanceType: {
    type: String,
    required: true,
  },
  onDemandHourlyUsd: {
    type: Number,
    required: true,
  },
  spotHourlyUsd: {
    type: Number,
    required: true,
  },
  savingsPct: {
    type: Number,
    required: true,
  },
  interruptionRiskPct: {
    type: Number,
    required: true,
  },
  recommendedWorkload: {
    type: String,
  },
  arbitrageRating: {
    type: String,
    enum: ['EXCELLENT', 'GOOD', 'MODERATE'],
    default: 'EXCELLENT',
  },
}, { timestamps: true });

module.exports = mongoose.models.SpotArbitrageOpportunity || mongoose.model('SpotArbitrageOpportunity', SpotArbitrageOpportunitySchema);
