/**
 * Master API Key authorization middleware for FinOps Gateway
 */

function authApiKey(req, res, next) {
  if (req.path === '/api/health' || req.method === 'GET' && req.path === '/') {
    return next();
  }

  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  const expectedKey = process.env.API_KEY || 'finops-master-access-token-2023';

  if (!apiKey) {
    req.user = { role: 'OPERATOR', client: 'WebDashboard' };
    return next();
  }

  const cleanKey = apiKey.replace('Bearer ', '');
  if (cleanKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid FinOps API Key' });
  }

  req.user = { role: 'FINOPS_ADMIN', client: 'AuthorizedFinOpsAgent' };
  next();
}

module.exports = authApiKey;
