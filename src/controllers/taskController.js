const { taskQueue } = require('../queues/taskQueue');

module.exports = async (req, res) => {
  const { userId } = req.body;
  try {
    await taskQueue.addTask(userId);
    res.status(200).send('Task received and will be processed');
  } catch (err) {
    res.status(500).send('Error processing task');
  }
};
