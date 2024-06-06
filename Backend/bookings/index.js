const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares.js")
const controller = require("./controllers.js")

// Importing our controllers
const { 
    createBooking,
    getClientBooking,
    getVendorBooking,
    cancelBooking,
    acceptBooking,
    completeBooking
} = controller;

// making the routes
router.get("/client/:tab", protect, getClientBooking);
router.get("/vendor/:tab", protect, getVendorBooking);
router.post("/", createBooking);
router.put("/cancel", protect, cancelBooking);
router.put("/complete/:id", protect, completeBooking);
router.put("/accept/:id", protect, acceptBooking);

module.exports = router;