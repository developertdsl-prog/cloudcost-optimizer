/**
 * Request validation middleware for FinOps operations
 */

function validateK8sWorkload(req, res, next) {
  const { currentCpuCores, p95CpuCores, currentMemoryGb, p95MemoryGb } = req.body;

  if (currentCpuCores !== undefined && (typeof currentCpuCores !== 'number' || currentCpuCores <= 0)) {
    return res.status(400).json({ error: 'currentCpuCores must be a positive number' });
  }

  if (p95CpuCores !== undefined && (typeof p95CpuCores !== 'number' || p95CpuCores < 0)) {
    return res.status(400).json({ error: 'p95CpuCores must be a non-negative number' });
  }

  if (currentMemoryGb !== undefined && (typeof currentMemoryGb !== 'number' || currentMemoryGb <= 0)) {
    return res.status(400).json({ error: 'currentMemoryGb must be a positive number' });
  }

  if (p95MemoryGb !== undefined && (typeof p95MemoryGb !== 'number' || p95MemoryGb < 0)) {
    return res.status(400).json({ error: 'p95MemoryGb must be a non-negative number' });
  }

  next();
}

module.exports = { validateK8sWorkload };
