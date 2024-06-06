const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddlewares.js");
const controller = require("./controllers.js");

// Importing our controllers
const { createAddOn, getAddonByServicesID, getAddonByID, updateAddon } =
  controller;

// making the routes
router.route("/").post(createAddOn);
router.route("/:id").get(getAddonByID).put(updateAddon);
router.get("/serviceId/:servicesID", getAddonByServicesID);

module.exports = router;
