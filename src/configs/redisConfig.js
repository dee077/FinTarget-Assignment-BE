const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
require('dotenv').config();


const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const rateLimiterPerRequest = new RateLimiterRedis({
  storeClient: redisClient,
  points: 1, 
  duration: 1, 
  blockDuration: 1,
  keyPrefix: 'rateLimiterPerRequest'
});

const rateLimiterPerMinute = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, 
  duration: 60, 
  blockDuration: 60,
  keyPrefix: 'rateLimiterPerMinute'
});


redisClient.on('ready', () => {
  console.log(`Connected to Redis successfully for process ${process.pid}`);
});

redisClient.on('error', (err) => {
  console.error(`Error on Redis with process ${process.pid}`, err);
});


module.exports = { redisClient, rateLimiterPerRequest, rateLimiterPerMinute };
