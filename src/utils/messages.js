const successMessage = {
  message: "Task received and will be processed",
  limits: "Only 1 request is allowed per second and 20 requests are allowed per minute",
};

const errorMessage = {
  message: "Rate limit exceeded",
  limits: "Only 1 request is allowed per second and 20 requests are allowed per minute",
};

module.exports = { successMessage, errorMessage }