const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddlewares.js");
const controller = require("./controllers.js");

// Importing our controllers
const {
  getDashboardCount,
  getAllVendors,
  changeVendorStatus,
  createVendor,
  getBookings,
  getAllClients,
  deleteClient,
  getVendorByID,
  changeServiceStatus,
  setPassword,
  refundPayment,
  releasePayment,
  getNotifications,
  viewNotification,
  viewSingleNotification,
  reportCart,
  deleteService
} = controller;

// making the routes
router.get("/", getDashboardCount);
router.get("/payment", getBookings);
router.get("/notification", getNotifications);
router.get("/client", getAllClients);
router.get("/registration/:id", getVendorByID);
router.post("/payment/refund/:id/:total/:cartId", refundPayment);
router.post("/payment/release/:id/:total/:cartId", releasePayment);
router.put("/payment/report/:id", reportCart);
router.delete("/client/:id", deleteClient);
router.delete("/service/:id", deleteService);
router.put("/registration/password", setPassword);
router.put("/notification/view", viewNotification);
router.put("/notification/view/:id", viewSingleNotification);
router.route("/registration").get(getAllVendors).post(createVendor);
router.put("/registration/:id/:status", changeVendorStatus);
router.put("/registration/service/:id/:status", changeServiceStatus);

module.exports = router;
