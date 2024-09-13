const { rateLimiterPerRequest, rateLimiterPerMinute } = require('../configs/redisConfig');
const { addTask } = require('../queues/taskQueue');
const { errorMessage } = require('../utils/messages');

module.exports = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await rateLimiterPerRequest.consume(userId);
    await rateLimiterPerMinute.consume(userId);
    next();
  } catch (rejRes) {
    // const delay = rejRes.msBeforeNext;
    // console.log(delay)
    await addTask(userId, 1000);
    res.status(429).send(errorMessage);
  }
};
