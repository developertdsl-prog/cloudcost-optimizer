const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error('FinOps Service Fault: %s', err.stack || err.message);

  const status = err.status || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(status).json({
    error: isProd ? 'Internal FinOps Optimization Engine Error' : err.message,
    timestamp: new Date().toISOString(),
  });
}

module.exports = errorHandler;
