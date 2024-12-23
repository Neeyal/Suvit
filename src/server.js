// src/server.js
const http = require("http");
const socketIo = require("socket.io");
const redis = require("redis");
const jwt = require("jsonwebtoken");
const app = require("./app");
const socketHandler = require("./sockets/socketHandler");

const server = http.createServer(app);
const io = socketIo(server);
const redisClient = redis.createClient();
const pubClient = redis.createClient();
const subClient = redis.createClient();

io.use((socket, next) => {
  const token = socket.handshake.query.token;
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) return next(new Error("Authentication error"));
    socket.userId = decoded.id;
    next();
  });
});

io.on("connection", (socket) => {
  socketHandler(socket, redisClient);
});

subClient.subscribe("notifications");

subClient.on("message", (channel, message) => {
  const notification = JSON.parse(message);
  const { userId, data } = notification;
  redisClient.get(userId, (err, socketId) => {
    if (socketId) {
      io.to(socketId).emit("notification", data);
    }
  });
});

server.listen(3009, () => {
  console.log("Server is running on port 3000");
});
