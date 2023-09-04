require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, disconnectDB } = require('./config/db');
const logger = require('./utils/logger');
const authApiKey = require('./middleware/authApiKey');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const recommendationRoutes = require('./routes/recommendationRoutes');
const spotRoutes = require('./routes/spotRoutes');
const wasteRoutes = require('./routes/wasteRoutes');
const anomalyRoutes = require('./routes/anomalyRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(authApiKey);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'CloudCost-Optimizer FinOps Core',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// API Routes
app.use(recommendationRoutes);
app.use(spotRoutes);
app.use(wasteRoutes);
app.use(anomalyRoutes);
app.use(analyticsRoutes);

// Static client UI serving
const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(errorHandler);

let serverInstance = null;

async function startServer() {
  await connectDB();
  serverInstance = app.listen(PORT, () => {
    logger.info(`💰 CloudCost-Optimizer FinOps Engine listening on http://localhost:${PORT}`);
    logger.info(`⚡ API Endpoints mounted at http://localhost:${PORT}/api/`);
  });
  return serverInstance;
}

if (require.main === module) {
  startServer();
}

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down CloudCost-Optimizer gracefully...');
  if (serverInstance) serverInstance.close();
  await disconnectDB();
  process.exit(0);
});

module.exports = { app, startServer };
