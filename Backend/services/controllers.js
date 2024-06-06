const asyncHandler = require("express-async-handler");
const Service = require("./model.js");
const Review = require("../reviews/model.js");

//  @desc   :  Create Service
//  @Route  :  POST /services
//  @access :  Private
const createService = asyncHandler(async (req, res) => {
  const { name, price, city, description, multipleImages } = req.body;
  const coverImage = req.file?.filename;

  if (!name || !price || !coverImage || !city || !description) {
    res.status(400);
    throw new Error("Name, price, city, or description is missing!");
  }

  const services = new Service({ ...req.body, coverImage });
  const newServices = await services.save();

  if (newServices) {
    res.status(201).json(newServices);
  } else {
    res.status(500);
    throw new Error("Something went wrong!");
  }
});

//  @desc   :  Get Service
//  @Route  :  GET /services
//  @access :  Private
const getService = asyncHandler(async (req, res) => {
  // req.user is coming from authMiddleware
  const id = req.user._id;

  const services = await Service.find({ userId: id }).populate({
    path: "userId",
    select: "-password",
  });

  if (!services) {
    res.status(500);
    throw new Error("Service not found");
  }

  res.status(200).json(services);
});

//  @desc   :  Get All Service To Show On Services page Of Client
//  @Route  :  GET /services/allservices/:service
//  @access :  public
const getAllService = asyncHandler(async (req, res) => {
  const service = req.params.service;
  const serviceName = service.replace("-", " ");

  const services = await Service.find({ status: "Accepted" })
    .populate({ path: "userId", select: "-password" })
    .select("-multipleImages");

  const filteredServices = services.filter(
    (items) => items.userId?.vendor === serviceName
  );

  res.status(200).json(filteredServices);
});

//  @desc   :  Get All Service To Show After Explore vendor
//  @Route  :  GET /services/searchservices
//  @access :  public
const getAllServicesForSearch = asyncHandler(async (req, res) => {
  const services = await Service.find({ status: "Accepted" })
    .populate({ path: "userId", select: "-password" })
    .select("-multipleImages");

  res.status(200).json(services);
});

//  @desc   :  Get All Service By User ID To Show On Service page of all service part
//  @Route  :  GET /services/vendorservice/:id
//  @access :  public
const getAllServiceByUserID = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const services = await Service.find({ userId, status: "Accepted" }).populate({
    path: "userId",
    select: "-password",
  });

  res.status(200).json(services);
});

//  @desc   :  Get Service By ID
//  @Route  :  GET /services/:id
//  @access :  Private
const getServiceByID = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const services = await Service.findById(id).populate("userId").exec();

  if (!services) {
    res.status(500);
    throw new Error("Service not found");
  }
  res.status(200).json(services);
});

const getMostSearchedVendors = asyncHandler(async (req, res) => {
  let services;
  const servicesId = [];
  const vendors = await Review.find({ "client.rating": { $gt: 3 } })
    .populate("cartId")
    .exec();
  vendors.map((items) => {
    servicesId.push(items?.cartId?.servicesId);
  });

  if (servicesId) {
    services = await Service.find({
      _id: { $in: servicesId },
      status: "Accepted",
    })
      .populate({ path: "userId", select: "-password" })
      .select("-multipleImages");
  }

  res.status(200).json(services);
});

//  @desc   :  Delete Service
//  @Route  :  delete /services/:id
//  @access :  Private
const deleteService = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const services = await Service.findByIdAndDelete(id);

  await Carts.updateMany({ servicesId: id }, { servicesId: null });

  if (!services) {
    res.status(400);
    throw new Error("Service Not Found");
  }
  res.status(201).json("Service has been deleted");
});

//  @desc   :  Update Service
//  @Route  :  PUT /services/:id
//  @access :  Private
const updateServices = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const coverImage = req.file?.filename;


    const services = await Service.updateOne(
      { _id: id },
      {
        $set: { ...req.body, coverImage },
      },
      { new: true }
    );

    if (!services) {
      res.status(400);
      throw new Error("Service Not Found");
    }

    res.status(200).json(services);
  } catch (error) {
    console.log(error.message);
  }
});

//  Exporting the routes
module.exports = {
  createService,
  getService,
  getAllService,
  getAllServiceByUserID,
  deleteService,
  updateServices,
  getServiceByID,
  getAllServicesForSearch,
  getMostSearchedVendors,
};
