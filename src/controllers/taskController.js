const { rateLimiterPerMinute, rateLimiterPerRequest, addUserTime, getUserTime } = require('../configs/redisConfig');
const { addTask } = require('../queues/taskQueue');
const { successMessage } = require('../utils/messages');

module.exports = async (req, res) => {
  const { userId } = req.body;
  try {
    // await rateLimiterPerRequest.consume(userId,1);
    // await rateLimiterPerMinute.consume(userId,1);
    await addTask(userId);
    await addUserTime(userId, Date.now()+5000);
    // console.log(Date.now(), await getUserTime(userId))
    res.status(200).send(successMessage);
  } catch (rateLimiterRes) {
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
