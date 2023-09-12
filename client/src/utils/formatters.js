/**
 * FinOps Currency and Resource formatting helpers
 */
const formatters = {
  formatCurrency(amount) {
    if (!amount && amount !== 0) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  },

  formatPercent(pct) {
    if (!pct && pct !== 0) return '0%';
    return `${pct.toFixed(1)}%`;
  },
};

window.formatters = formatters;
