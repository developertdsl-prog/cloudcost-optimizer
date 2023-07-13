const mongoose = require('mongoose');

const CloudResourceSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['AWS', 'GCP', 'AZURE'],
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
    unique: true,
  },
  resourceType: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  instanceType: {
    type: String,
  },
  hourlyCostUsd: {
    type: Number,
    required: true,
  },
  utilizationPct: {
    type: Number,
    default: 0,
  },
  isIdle: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Map,
    of: String,
  },
}, { timestamps: true });

module.exports = mongoose.models.CloudResource || mongoose.model('CloudResource', CloudResourceSchema);
