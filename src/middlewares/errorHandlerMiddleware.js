const fs = require('fs');
const path = require('path');
const { getTimeNow } = require('../utils/functions');

// Error-handling middleware
module.exports = (err, req, res, next) => {
  const logFilePath = path.join(__dirname, '../logs/error_logs.txt');
  const errorMessage = `${getTimeNow()} - Error: ${err.message} at ${process.pid}\n`;

  // console.log(errorMessage)
  
  // Log the error to a file
  fs.appendFileSync(logFilePath, errorMessage, 'utf8');
  
  // Send a generic error response
  res.status(500).send('An internal error occurred. Please try again later.');
};
