// src/controllers/notificationsController.js
const redis = require("redis");
const pubClient = redis.createClient();

exports.sendNotification = (req, res) => {
  const { userId, eventType, data } = req.body;
  const notification = {
    userId,
    eventType,
    data,
  };
  pubClient.publish("notifications", JSON.stringify(notification));
  res.status(200).send("Notification sent");
};
