const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares.js")
const controller = require("./controllers.js")

// Importing our controllers
const { 
    createCart,
    CheckoutCartByUserID,
    DeleteCartByID,
    FindCartByUserID,
    reportCart,
    getVendorEarning,
    getCartByID,
    updateCart
} = controller;

// making the routes
router.route("/").get(protect, FindCartByUserID).post(createCart).put(protect, CheckoutCartByUserID)
router.get("/:id", getVendorEarning)
router.get("/edit/:id", getCartByID)
router.put("/:id", reportCart)
router.put("/edit/:id", updateCart)
router.delete("/:id", DeleteCartByID);

module.exports = router;