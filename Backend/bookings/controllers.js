const asyncHandler = require("express-async-handler");
const Booking = require("./model.js");
const Cart = require("../cart/model.js");
const { createStripe, refundSpecificAmountStripe } = require("../utils");

//  @desc   :  Create Booking
//  @Route  :  POST /bookings
//  @access :  Public
const createBooking = asyncHandler(async (req, res) => {
  const { cartId, token, total, amount } = req.body;

  const cart = await Cart.find({ _id: { $in: cartId } });

  // Check if any cart in the array matches the desired conditions
  const matchingCarts = await Cart.find({
    $or: cart.map((c) => ({
      servicesId: c.servicesId,
      eventDate: c.eventDate,
      eventTime: c.eventTime,
      status: "Accept",
    })),
  });

  if (matchingCarts.length == 0) {
    const payment = await createStripe({ token, total: amount });
    if (payment) {
      const bookings = new Booking({ ...req.body, paymentId: payment?.id });
      await Cart.updateMany(
        { _id: { $in: cartId } },
        { $set: { cartPaymentStatus: "Confirm" } },
        { new: true }
      );
      const newBookings = await bookings.save();
      res.status(201).json(newBookings);
    } else {
      res.status(500).json("Some Error in payment");
    }
  } else {
    res.status(404);
    throw new Error("Service is already booked by other user!");
  }
});

//  @desc   :  Show the bookings to Vendor according to the selected tab
//  @Route  :  Get /bookings/vendor/:tab
//  @access :  Private
const getVendorBooking = asyncHandler(async (req, res) => {
  // Extract user ID and tab from the request
  const id = req.user?._id;
  const tab = req.params.tab;

  // Define a mapping of tab names to status values
  const tabsOption = {
    upcoming: ["Pending"],
    current: ["Accept"],
    completed: ["Complete"],
    cancelled: ["Reject", "Cancel", "Dispute"],
  };

  // Get the status based on the selected tab
  const status = tabsOption[tab];

  try {
    // Find all bookings and populate the "cartId" field with "servicesId"
    const populateBookings = await Booking.find({})
      .populate({
        path: "cartId",
        populate: {
          path: "servicesId",
          select: "-multipleImages",
          populate: {
            path: "userId", // Populate the "userId" field within "servicesId"
            select: "-password",
          },
        },
      })
      .populate({
        path: "cartId",
        populate: {
          path: "userId",
        },
      });

    // Map and filter the bookings to include only relevant data
    const filterCartId = populateBookings.map((booking) => ({
      ...booking.toObject(),
      cartId: booking.cartId.filter(
        (item) =>
          status.includes(item?.status) &&
          item?.servicesId?.userId?._id.toString() === id.toString()
      ),
    }));

    // Send the filtered bookings as a JSON response
    res.status(201).json(filterCartId);
  } catch (error) {
    console.log(error.message);
    // Handle any errors and send a 500 Internal Server Error response
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Get Previous Booking For Client
//  @Route  :  GET /bookings/client/:tab
//  @access :  Private
const getClientBooking = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const tab = req.params.tab;

  const tabsOption = {
    current: ["Accept", "Pending"],
    previous: ["Complete", "Cancel", "Reject", "Dispute"],
  };

  const status = tabsOption[tab];

  let bookings;

  try {
    bookings = await Booking.find({}).populate({
      path: "cartId",
      populate: {
        path: "servicesId",
        select: "-multipleImages",
        populate: { path: "userId", select: "-password" },
      },
    });

    // Map and filter the bookings to include only relevant data
    const filterCartId = bookings.map((booking) => ({
      ...booking.toObject(),
      cartId: booking.cartId.filter(
        (item) =>
          status.includes(item.status) &&
          item.userId._id.toString() === id.toString()
      ),
    }));

    res.status(201).json(filterCartId);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Cancel the booking for Client and vendor as Reject
//  @Route  :  PUT /bookings/cancel
//  @access :  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const { id, option, pid, amount } = req.body;

  try {
    // await refundSpecificAmountStripe(pid, amount);
    await Booking.updateOne(
      { paymentId: pid },
      { $set: { paymentStatus: "Refunded" } },
      { new: true }
    );
    const updatedBooking = await Cart.updateOne(
      { _id: id },
      { $set: { status: option, cartPaymentStatus: "Refunded" } },
      { new: true }
    );
    res.status(201).json(updatedBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Accept the booking for vendor
//  @Route  :  PUT /bookings/accept/:id
//  @access :  Private
const acceptBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;

  try {
    const updatedBooking = await Cart.updateOne(
      { _id: bookingId },
      { $set: { status: "Accept" } },
      { new: true }
    );
    res.status(201).json(updatedBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  Complete the booking for vendor
//  @Route  :  PUT /bookings/complete/:id
//  @access :  Private
const completeBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;

  try {
    const updatedBooking = await Cart.updateOne(
      { _id: bookingId },
      { $set: { status: "Complete" } },
      { new: true }
    );
    res.status(201).json(updatedBooking);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  Exporting the routes
module.exports = {
  createBooking,
  getVendorBooking,
  getClientBooking,
  cancelBooking,
  acceptBooking,
  completeBooking,
};
