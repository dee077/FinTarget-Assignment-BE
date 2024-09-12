const express = require("express");
const taskRoutes = require("./routes/taskRoute");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const rateLimiterMiddleware = require("./middlewares/rateLimiterMiddleware");

const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", taskRoutes);

app.use(errorHandler, rateLimiterMiddleware);

const server = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - Process ${process.pid}`);
  });
};
module.exports = { server, app };
