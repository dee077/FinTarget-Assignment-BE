const { rateLimiterPerRequest, rateLimiterPerMinute } = require('../configs/redisConfig');
const { errorMessage } = require('../utils/messages');

module.exports = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    await rateLimiterPerRequest.consume(userId,1); // Consume 1 point per request
    await rateLimiterPerMinute.consume(userId,1)
    next();
  } catch (rejRes) {
    res.status(429).send(errorMessage);
  }
};
