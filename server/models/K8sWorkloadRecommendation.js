const mongoose = require('mongoose');

const K8sWorkloadRecommendationSchema = new mongoose.Schema({
  clusterName: {
    type: String,
    required: true,
  },
  namespace: {
    type: String,
    required: true,
  },
  deploymentName: {
    type: String,
    required: true,
  },
  currentCpuCores: {
    type: Number,
    required: true,
  },
  recommendedCpuCores: {
    type: Number,
    required: true,
  },
  currentMemoryGb: {
    type: Number,
    required: true,
  },
  recommendedMemoryGb: {
    type: Number,
    required: true,
  },
  replicas: {
    type: Number,
    default: 1,
  },
  monthlySavingsUsd: {
    type: Number,
    required: true,
  },
  overProvisionedPct: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPLIED', 'DISMISSED'],
    default: 'PENDING',
  },
}, { timestamps: true });

module.exports = mongoose.models.K8sWorkloadRecommendation || mongoose.model('K8sWorkloadRecommendation', K8sWorkloadRecommendationSchema);
