const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares.js")
const controller = require("./controller.js")

// Importing our controllers
const { 
    getNotifications,
    readNotification,
    createNotification,
    viewNotification
} = controller;

// making the routes
router.route("/").get(protect,  getNotifications).post(createNotification);
router.put("/view", protect,  viewNotification);
router.put("/:id", readNotification);

module.exports = router;