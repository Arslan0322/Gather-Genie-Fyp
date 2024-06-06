const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddlewares.js");
const { upload } = require("../middlewares/multerMiddlewares.js");
const controller = require("./controllers.js");

// Importing our controllers
const {
  createService,
  deleteService,
  getService,
  getAllServiceByUserID,
  updateServices,
  getServiceByID,
  getAllService,
  getAllServicesForSearch,
  getMostSearchedVendors,
} = controller;

// making the routes
router.get("/searchservice", getAllServicesForSearch);
router.get("/mostsearch", getMostSearchedVendors);
router.get("/allservice/:service", getAllService);
router.get("/vendorservice/:id", getAllServiceByUserID);
router
  .route("/")
  .get(protect, getService)
  .post(protect, upload.single("coverImage"), createService);
router
  .route("/:id")
  .get(getServiceByID)
  .put(protect, upload.single("coverImage"), updateServices)
  .delete(protect, deleteService);

module.exports = router;
