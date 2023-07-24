/**
 * In-memory sliding window rate limiter
 */

const clientBuckets = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 300;

function rateLimiter(req, res, next) {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const now = Date.now();

  let bucket = clientBuckets.get(clientIp);
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    bucket = { windowStart: now, count: 0 };
    clientBuckets.set(clientIp, bucket);
  }

  bucket.count++;

  if (bucket.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Rate limit exceeded: Please wait before requesting further FinOps calculations.',
      retryAfterMs: WINDOW_MS - (now - bucket.windowStart),
    });
  }

  next();
}

module.exports = rateLimiter;
