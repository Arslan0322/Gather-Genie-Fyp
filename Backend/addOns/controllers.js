const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const AddOn = require("./model.js");

//  @desc   :  Create Addon
//  @Route  :  POST /addon
//  @access :  Public
const createAddOn = asyncHandler(async (req, res) => {
  try {
    // If the service is available, create a new cart
    const newAddOn = new AddOn(req.body);
    await newAddOn.save();
    res.status(201).json(newAddOn);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Get Addon By ServicesID
//  @Route  :  GET /addon/:servicesID
//  @access :  Public
const getAddonByServicesID = asyncHandler(async (req, res) => {
  const servicesID = req.params.servicesID;
  try {
    const addon = await AddOn.find({ servicesId: servicesID }).exec();

    if (!addon) {
      res.status(404);
      throw new Error(`AddOn of Services id = ${servicesID} not found`);
    }

    res.status(200).json(addon);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Get Addon By ID
//  @Route  :  GET /addon/:id
//  @access :  Public
const getAddonByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const addon = await AddOn.findById(id).exec();

    if (!addon) {
      res.status(404);
      throw new Error(`AddOn of ID: ${id} not found`);
    }

    res.status(200).json(addon);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Update Addon
//  @Route  :  PUT /addon/:id
//  @access :  Public
const updateAddon = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const addon = await AddOn.updateOne(
      { _id: id },
      {
        $set: {
          addOn: req.body,
        },
      },
      { new: true }
    );

    if (!addon) {
      res.status(400);
      throw new Error("Addon Not Found");
    }

    res.status(200).json(addon);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  Exporting the routes
module.exports = {
  createAddOn,
  getAddonByServicesID,
  getAddonByID,
  updateAddon,
};
