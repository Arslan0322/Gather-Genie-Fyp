const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares.js")
const {uploadFile, uploadCV} = require("../middlewares/multerMiddlewares")
const controller = require("./controllers.js")

// Importing our controllers
const { 
    authUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
    forgetPassword
} = controller;

// making the routes
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.post("/",uploadFile.single('experience'), registerUser);
router.post("/:email", forgetPassword)
router.route("/profile").get(protect, getUserProfile).put(protect, uploadCV.fields(
    [
        {
            name:'photo',
            maxCount:1
        },
        {
            name: 'experience', maxCount:1
        }
    ]
  ),  updateUserProfile)

module.exports = router;