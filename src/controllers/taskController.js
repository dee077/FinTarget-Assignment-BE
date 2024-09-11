const taskService = require('../services/taskService');

exports.processTask = async (req, res) => {
  const { user_id } = req.body;
  try {
    await taskService.addTask(user_id);
    res.status(200).send('Task received and will be processed');
  } catch (err) {
    res.status(500).send('Error processing task');
  }
};
