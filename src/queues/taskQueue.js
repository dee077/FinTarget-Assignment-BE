const Queue = require('bull');
const { processTask } = require('./taskProcessor'); // Use the new module
require('dotenv').config();

const taskQueue = new Queue('taskQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD, // Optional
  },
  settings: {
    retries: 3, // Retry tasks 3 times before failing
  },
});

// Define how tasks will be processed
taskQueue.process(async (job, done) => {
  const { userId } = job.data;
  try {
    await processTask(userId);
    done();
  } catch (err) {
    const errorLogEntry = `Queue error for user ${userId} at ${Date.now()}: ${err.message}\n`;
    fs.appendFileSync(path.join(__dirname, '../error_logs.txt'), errorLogEntry, 'utf8');
    done(new Error('Task processing failed'));
  }
});

module.exports = taskQueue;
