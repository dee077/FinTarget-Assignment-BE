const { rateLimiterPerRequest, rateLimiterPerMinute, getUserTime, addUserTime } = require('../configs/redisConfig');
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
    const endTime = await getUserTime(userId)
    const delay = endTime - Date.now()
    console.log(delay)
    await addTask(userId, delay);
    await addUserTime(userId, Date.now()+delay+5000);
    res.status(429).send(errorMessage);
  }
};
