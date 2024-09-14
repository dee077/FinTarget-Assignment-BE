const { Queue, Worker, QueueScheduler } = require('bullmq');
const fs = require('fs');
const path = require('path');
const { getTimeNow } = require('../utils/functions');
require('dotenv').config();

// Redis connection options
const redisOptions = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

// Create a new queue
const taskQueue = new Queue('taskQueue', redisOptions);

// Define the task processing logic
const worker = new Worker('taskQueue', async (job) => {
  const { userId, delay } = job.data;
  try {
    await logTask(userId, delay);
  } catch (err) {
    const errorLogEntry = `Queue error for user ${userId} at ${getTimeNow()} at ${process.pid}: ${err.message}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs/error_logs.txt'), errorLogEntry, 'utf8');
    throw new Error('Task processing failed');
  }
}, redisOptions);

// Add a task to the queue
const addTask = async (userId, delay=0) => {
  await taskQueue.add('task', { userId, delay }, { delay: delay });
};

// Log the task completion
const logTask = async (userId, delay) => {
  try {
    const logEntry = `UserId = ${userId} task completed at-${getTimeNow()} by process-${process.pid} with delay-${delay}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs/task_logs.txt'), logEntry, 'utf8');
  } catch (err) {
    const errorLogEntry = `Error processing task for user ${userId} at ${getTimeNow()} at ${process.pid}: ${err.message}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs/error_logs.txt'), errorLogEntry, 'utf8');
  }
};

module.exports = { addTask };
