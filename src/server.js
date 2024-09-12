const express = require('express');
const taskRoutes = require('./routes/taskRoute')
const errorHandler = require('./middlewares/errorHandlerMiddleware')

const app = express();
require('dotenv').config();


app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT;

app.use('/api', taskRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - Process ${process.pid}`);
});