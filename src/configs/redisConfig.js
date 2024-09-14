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
  duration: 5, 
  blockDuration: 5,
  keyPrefix: 'rateLimiterPerRequest'
});

const rateLimiterPerMinute = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, 
  duration: 60, 
  blockDuration: 60,
  keyPrefix: 'rateLimiterPerMinute'
});

const USER_DELAY_TIME = 'userDelayTime:';

const getUserTime = async (userId) => {
  const time = await redisClient.get(`${USER_DELAY_TIME}${userId}`);
  return time ? parseInt(time) : 0;
};

const addUserTime = async (userId, time) => {
  await redisClient.set(`${USER_DELAY_TIME}${userId}`, time, 'EX', 5);
};

const cleanRedisKeys = async (prefix) => {
  const keys = await redisClient.keys(`${prefix}:*`);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
}

redisClient.on('ready', () => {
  console.log(`Connected to Redis successfully for process ${process.pid}`);
});

redisClient.on('error', (err) => {
  console.error(`Error on Redis with process ${process.pid}`, err);
});


module.exports = { redisClient, rateLimiterPerRequest, rateLimiterPerMinute, getUserTime, addUserTime, cleanRedisKeys };
