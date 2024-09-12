const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
require('dotenv').config();


const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, // Number of points or requests
  duration: 60, // Per minute
  blockDuration: 1, // Block for 1 minute if consumed more than 20 points
});

redisClient.on('ready', () => {
  console.log(`Connected to Redis successfully for process ${process.pid}`);
});

// console.log(redisClient)

redisClient.on('error', (err) => {
  console.error(`Error on Redis with process ${process.pid}`, err);
});


module.exports = { redisClient, rateLimiter };
