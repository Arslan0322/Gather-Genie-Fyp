const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Cart = require("./model.js");
const AddOn = require("../addOns/model.js");

//  @desc   :  Create Cart
//  @Route  :  POST /carts
//  @access :  Public
const createCart = asyncHandler(async (req, res) => {
  const {
    eventDate,
    eventTime,
    servicesId,
    userId,
    quantity,
    description,
    dateTime,
  } = req.body;

  if (!description) {
    const missingFields = "Description";
    res.status(400);
    throw new Error(`${missingFields} is missing!`);
  }

  try {
    // Check if the service is already booked
    const allCart = await Cart.find({ servicesId, status: "Accept" });

    for (let i = 0; i < allCart?.length; i++) {
      const cartItem = allCart[i];


      const isServiceBooked = cartItem?.dateTime?.some((existingItem) =>
        dateTime?.some((item) => {
          const isTimeConflict =
            (existingItem.eventTime <= item.endTime && existingItem.endTime >= item.eventTime) ||
            (item.eventTime <= existingItem.endTime && item.endTime >= existingItem.eventTime) ||
            (existingItem.eventTime <= item.eventTime && existingItem.endTime >= item.endTime);

          return isTimeConflict && existingItem.date === item.date;
        })
      );


      if (isServiceBooked) {
        res.status(404);
        throw new Error("Service is already booked by another user!");
      }
    }

    // Check if the service is already in the user's cart
    const isServiceInCart = await Cart.find({
      userId,
      servicesId,
      status: "Pending",
      isCheckout: false,
    });

    if (isServiceInCart.length != 0) {
      res.status(404);
      throw new Error("Service is already in your cart!");
    }

    // If the service is available, create a new cart
    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Find Cart of the login user
//  @Route  :  Get /carts
//  @access :  Private
const FindCartByUserID = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const cart = await Cart.find({ userId: id, isCheckout: false })
    .populate({
      path: "servicesId",
      populate: {
        path: "userId", // Populate the "userId" field within "servicesId"
        select: "-password",
      },
    })
    .exec();

  try {
    res.status(200).json(cart);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Deleting cart by id
//  @Route  :  DELETE /carts/:id
//  @access :  Public
const DeleteCartByID = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const carts = await Cart.deleteOne({ _id: id });

  if (!carts) {
    res.status(400);
    throw new Error("Cart Not Found");
  }
  res.status(201).json("Cart has been deleted");
});

//  @desc   :  Deleting cart by id
//  @Route  :  PUT /carts
//  @access :  Private
const CheckoutCartByUserID = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const carts = await Cart.updateMany(
    { userId: id },
    {
      $set: { isCheckout: true },
    },
    { new: true }
  );

  try {
    res.status(200).json("Cart has been checkout");
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Updating cart by reporting
//  @Route  :  PUT /carts/:id
//  @access :  Private
const reportCart = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Cart.updateOne(
    { _id: id },
    { $set: { isReported: true } },
    { new: true }
  );
  res.status(200).json("Vendor has been reported!");
});

//  @desc   :  Get total earnings of vendor
//  @Route  :  GET /carts/:id
//  @access :  Public
const getVendorEarning = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // First storing all Cart data with proper populated in earning
  const earnings = await Cart.find({ cartPaymentStatus: "Released" })
    .populate({ path: "servicesId", select: "-multipleImages" })
    .exec();

  // filtering the earning data with login vendor id
  const filterEarningById = earnings.filter(
    (items) => items?.servicesId?.userId == id
  );

  // calculating vendor earnings
  const totalEarning = filterEarningById?.reduce((accumulator, items) => {
    return accumulator + items?.cartPrice;
  }, 0);

  res.status(200).json(totalEarning);
});


//  @desc   :  Get Cart By ID , its for showing cart and services data in edit availablity drawer
//  @Route  :  GET /carts/edit/:id
//  @access :  Public
const getCartByID = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const cart = await Cart.findById(id)
    .populate({
        path: "servicesId",
        populate: {
          path: "userId", // Populate the "userId" field within "servicesId"
          select: "-password",
        },
      })
    .exec();

    const addOns = await AddOn.find({ servicesId: cart?.servicesId?._id }).exec();

  // .populate({
  //   path: "servicesId",
  //   populate: {
  //     path: "userId", // Populate the "userId" field within "servicesId"
  //     select: "-password",
  //   },
  // })

  try {
    res.status(200).json({data:cart, serviceAddOns: addOns[0]});
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Update Cart
//  @Route  :  PUT /cart/edit/:id
//  @access :  Public
const updateCart = asyncHandler(async (req, res) => {
  const {
    servicesId,
    dateTime,
  } = req.body;

  try {
    const id = req.params.id;

    // Check if the service is already booked
    const allCart = await Cart.find({ servicesId, status: "Accept" });

    for (let i = 0; i < allCart?.length; i++) {
      const cartItem = allCart[i];


      const isServiceBooked = cartItem?.dateTime?.some((existingItem) =>
        dateTime?.some((item) => {
          const isTimeConflict =
            (existingItem.eventTime <= item.endTime && existingItem.endTime >= item.eventTime) ||
            (item.eventTime <= existingItem.endTime && item.endTime >= existingItem.eventTime) ||
            (existingItem.eventTime <= item.eventTime && existingItem.endTime >= item.endTime);

          return isTimeConflict && existingItem.date === item.date;
        })
      );


      if (isServiceBooked) {
        res.status(404);
        throw new Error("Service is already booked by another user!");
      }
    }

    const cart = await Cart.updateOne(
      { _id: id },
      {
        $set: { ...req.body },
      },
      { new: true }
    );

    if (!cart) {
      res.status(400);
      throw new Error("Cart Not Found");
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

//  Exporting the routes
module.exports = {
  createCart,
  FindCartByUserID,
  DeleteCartByID,
  CheckoutCartByUserID,
  reportCart,
  getVendorEarning,
  getCartByID,
  updateCart
};
