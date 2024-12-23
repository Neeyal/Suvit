// src/sockets/socketHandler.js
module.exports = (socket, redisClient) => {
  const userId = socket.userId;
  redisClient.set(userId, socket.id);

  socket.on("disconnect", () => {
    redisClient.del(userId);
  });
};
