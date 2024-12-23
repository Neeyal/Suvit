// src/services/redisService.js
const redis = require("redis");

const createRedisClient = () => {
  return redis.createClient();
};

module.exports = {
  createRedisClient,
};
