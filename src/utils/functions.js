const { redisClient } = require("../configs/redisConfig");

const getTimeNow = () =>{
    const now = new Date();
    const formattedDate = now.toLocaleString();
    return formattedDate
}

module.exports = { getTimeNow }