const Queue = require('bull');
const fs = require('fs');
const path = require('path');
const { getTimeNow } = require('../utils/functions');
require('dotenv').config();

const taskQueue = new Queue('taskQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  settings: {
    retries: 3, // Retry tasks 3 times before failing
  },
});

// Define how tasks will be processed
taskQueue.process(async (job, done) => {
  const { userId } = job.data;
  try {
    await logTask(userId);
    done();
  } catch (err) {
    const errorLogEntry = `Queue error for user ${userId} at ${getTimeNow()} at ${process.pid}: ${err.message}\n`;
    // console.log(errorLogEntry)
    fs.appendFileSync(path.join(__dirname, '../logs/error_logs.txt'), errorLogEntry, 'utf8');
    done(new Error('Task processing failed'));
  }
});

taskQueue.addTask = (userId) => {
  return taskQueue.add({ userId });
};

const logTask = async (userId) => {
  try {
    const logEntry = `UserId = ${userId} task completed at-${getTimeNow()} by process-${process.pid}\n`;
    // console.log(logEntry)
    fs.appendFileSync(path.join(__dirname, '../logs/task_logs.txt'), logEntry, 'utf8');
  } catch (err) {
    const errorLogEntry = `Error processing task for user ${userId} at ${getTimeNow()} at ${process.pid}: ${err.message}\n`;
    // console.log(errorLogEntry)
    fs.appendFileSync(path.join(__dirname, '../logs/error_logs.txt'), errorLogEntry, 'utf8');
  }
};

module.exports = { taskQueue };
