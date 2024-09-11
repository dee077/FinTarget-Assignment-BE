const fs = require('fs');
const path = require('path');

// Error-handling middleware
module.exports = (err, req, res, next) => {
  const logFilePath = path.join(__dirname, '../error_logs.txt');
  const errorMessage = `${new Date().toISOString()} - Error: ${err.message}\n`;
  
  // Log the error to a file
  fs.appendFileSync(logFilePath, errorMessage, 'utf8');
  
  // Send a generic error response
  res.status(500).send('An internal error occurred. Please try again later.');
};
