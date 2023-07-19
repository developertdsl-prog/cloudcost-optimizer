const mongoose = require('mongoose');

const FinOpsBudgetSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  monthlyBudgetUsd: {
    type: Number,
    required: true,
  },
  currentSpendUsd: {
    type: Number,
    default: 0,
  },
  projectedSpendUsd: {
    type: Number,
    default: 0,
  },
  alertThresholdPct: {
    type: Number,
    default: 85,
  },
  status: {
    type: String,
    enum: ['HEALTHY', 'AT_RISK', 'BREACHED'],
    default: 'HEALTHY',
  },
}, { timestamps: true });

module.exports = mongoose.models.FinOpsBudget || mongoose.model('FinOpsBudget', FinOpsBudgetSchema);
