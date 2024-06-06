const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares.js")
const controller = require("./controllers.js")

// Importing our controllers
const { 
    createReview,
    getReview,
    getOverallReview,
    getReviewByUserId
} = controller;

// making the routes
router.get("/overall", getOverallReview)
router.get("/:id", getReviewByUserId)
router.route("/").get(protect, getReview).post(protect, createReview)

module.exports = router;