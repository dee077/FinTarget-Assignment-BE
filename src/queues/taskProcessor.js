const fs = require('fs');
const path = require('path');

const processTask = async (userId) => {
  try {
    const logEntry = `${userId}-task completed at-${Date.now()}\n`;
    fs.appendFileSync(path.join(__dirname, '../task_logs.txt'), logEntry, 'utf8');
  } catch (err) {
    const errorLogEntry = `Error processing task for user ${userId} at ${Date.now()}: ${err.message}\n`;
    fs.appendFileSync(path.join(__dirname, '../error_logs.txt'), errorLogEntry, 'utf8');
  }
};

module.exports = { processTask };
