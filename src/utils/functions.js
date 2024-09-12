const { redisClient } = require("../configs/redisConfig");

const getTimeNow = () =>{
    const now = new Date();
    const formattedDate = now.toLocaleString();
    return formattedDate
}

 const cleanRedisKeys = async (prefix) => {
    const keys = await redisClient.keys(`${prefix}:*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }

module.exports = { getTimeNow, cleanRedisKeys }