const taskQueue = require('../queues/taskQueue');

// Function to add tasks to the queue
exports.addTask = (userId) => {
  return taskQueue.add({ userId });
};
