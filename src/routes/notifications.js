// src/routes/notifications.js
const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/notify",
  authMiddleware,
  notificationsController.sendNotification
);

module.exports = router;
