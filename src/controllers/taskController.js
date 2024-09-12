const { taskQueue } = require('../queues/taskQueue');
const { successMessage } = require('../utils/messages');

module.exports = async (req, res) => {
  const { userId } = req.body;
  try {
    await taskQueue.addTask(userId);
    res.status(200).send(successMessage);
  } catch (err) {
    res.status(500).send('Error processing task');
  }
};
