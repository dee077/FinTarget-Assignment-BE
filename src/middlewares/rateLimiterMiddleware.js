const rateLimiter = require('../configs/redisConfig');

module.exports = async (req, res, next) => {
  const userId = req.body.user_id;
  try {
    await rateLimiter.consume(userId, 1); // Consume 1 point per request
    next();
  } catch (rejRes) {
    res.status(429).send('Rate limit exceeded');
  }
};
