const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
require('dotenv').config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD, // Optional
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, // Number of points
  duration: 60, // Per minute
  blockDuration: 60, // Block for 1 minute if consumed more than 20 points
});

module.exports = rateLimiter;
