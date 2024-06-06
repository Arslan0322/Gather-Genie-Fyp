const asyncHandler = require("express-async-handler");
const { sendMail } = require("../email");
const { refundSpecificAmountStripe, releaseStripe } = require("../utils");
const Users = require("../user/model");
const Bookings = require("../bookings/model");
const Services = require("../services/model");
const Carts = require("../cart/model");
const Notifications = require("../notification/model");

// --------------------------------------------------- NOTIFICATION -----------------------------------------------------
//  @desc   :  Get Notification
//  @Route  :  GET /admins/notification
//  @access :  PUBLIC
const getNotifications = asyncHandler(async (req, res) => {
  try {
    const notification = await Notifications.find({ toAdmin: true })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//  @desc   :  View Notification
//  @Route  :  PUT /admins/notification/view
//  @access :  PUBLIC
const viewNotification = async (req, res) => {
  try {
    // Update the isCount field to true for all documents in the collection
    await Notifications.updateMany({ toAdmin: true }, { isCount: true });

    return res
      .status(200)
      .json({ message: "Notification has been marked as read" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
};

//  @desc   :  View Notification
//  @Route  :  PUT /admins/notification/view/:id
//  @access :  PUBLIC
const viewSingleNotification = async (req, res) => {
  const id = req.params.id;
  try {
    // Update the isCount field to true for all documents in the collection
    await Notifications.updateMany(
      { toAdmin: true, _id: id },
      { isCount: true }
    );

    return res
      .status(200)
      .json({ message: "Notification has been marked as read" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
};

// --------------------------------------------------- DASHBAORD ---------------------------------------------------------
//  @desc   :  Get dashboard Count
//  @Route  :  GET /admins
//  @access :  Public
const getDashboardCount = asyncHandler(async (req, res) => {
  const vendorArray = [
    "Decor",
    "EventPlanner",
    "CarRental",
    "Venue",
    "Photographer",
    "Caterer",
  ];

  const vendorCount = await Users.countDocuments({
    type: "Vendor",
    status: "Accepted",
  });
  const clientCount = await Users.countDocuments({ type: "Client" });
  const earning = await Bookings.aggregate([
    {
      $match: {
        paymentStatus: "Confirm",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
  ]);

  const vendorTypesCount = await Users.aggregate([
    {
      $match: { type: "Vendor", status: "Accepted", vendor: { $ne: null } },
    },
    {
      $group: {
        _id: "$vendor",
        count: { $sum: 1 },
      },
    },
  ]);

  const countObject = {};
  vendorArray.forEach((items) => {
    countObject[items] = 0;
  });

  // Add vendor type counts to the response object
  vendorTypesCount.forEach((item) => {
    const formattedVendorType = item._id.replace(/\s+/g, ""); // Remove spaces from vendor type names
    countObject[formattedVendorType] = item.count;
  });

  // Construct the response object
  const dashboardCounts = {
    vendor: vendorCount,
    client: clientCount,
    total: earning[0]?.total || 0,
    ...countObject,
  };

  console.log(dashboardCounts);
  res.status(200).json(dashboardCounts);
});

// ---------------------------------------------------- REGISTRATION -----------------------------------------------------
//  @desc   :  Get All Vendors
//  @Route  :  GET /admins/registration
//  @access :  Public
const getAllVendors = asyncHandler(async (req, res) => {
  const allVendors = await Users.find({ type: "Vendor" })
    .select("-password")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json(allVendors);
});

//  @desc   :  Accept or Reject The vendor
//  @Route  :  PUT /admins/registration/:id/:status
//  @access :  Public
const changeVendorStatus = asyncHandler(async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;

    await Users.updateOne({ _id: id }, { $set: { status } });

    res.status(200).json("Status has been changed");
  } catch (error) {
    console.log(error.message);
  }
});

//  @desc   :  Create New Vendor
//  @Route  :  POST /admins/registration
//  @access :  Public
const createVendor = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, city, type, gender, number, vendor } =
    req.body;
  const userExist = await Users.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await Users.create({
    email,
    firstname,
    lastname,
    city,
    type,
    gender,
    number,
    vendor,
    status: "Accepted",
  });

  if (user) {
    await sendMail({
      sendTo: email,
      context: {
        inviteLink: `http://localhost:3000/setpassword/${user._id}`,
      },
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//  @desc   :  Create New Vendor
//  @Route  :  POST /admins/registration/password
//  @access :  Public
const setPassword = asyncHandler(async (req, res) => {
  const { password, id } = req.body;

  try {
    const user = await Users.findById(id);

    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    } else {
      // Update the user's password
      user.password = password;

      // Save the updated user object, the pre-save hook will automatically hash the password
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    // Handle any errors that occurred during the update process
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  @desc   :  Get Vendor By ID
//  @Route  :  GET /admins/registration/:id
//  @access :  Public
const getVendorByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const vendor = await Users.find({ type: "Vendor", _id: id })
    .select("-password")
    .exec();

  const vendorService = await Services.find({ userId: id })
    .select("-multipleImages")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json({ vendor, vendorService });
});

//  @desc   :  Accept or Reject The vendor
//  @Route  :  PUT /admins/registration/service/:id/:status
//  @access :  Public
const changeServiceStatus = asyncHandler(async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;

    await Services.updateOne({ _id: id }, { $set: { status } });

    res.status(200).json("Status has been changed");
  } catch (error) {
    console.log(error.message);
  }
});

const deleteService = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const service = await Services.findByIdAndDelete(id);

    res.status(200).json("Service has been deleted");
  } catch (error) {
    console.log(error.message);
  }
});

// ---------------------------------------------------- PAYMENTS -----------------------------------------------------
//  @desc   :  Get Bookings and payment detail
//  @Route  :  GET /admins/payment
//  @access :  Public
const getBookings = asyncHandler(async (req, res) => {
  const allBookings = await Bookings.find({})
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
    })
    .sort({ createdAt: -1 });

  const responseArray = [];

  // Making Array of objects for only simple those fields which we want in admin table
  allBookings.forEach((items) => {
    items?.cartId?.forEach((cartId) => {
      const responseObject = {
        _id: items?._id,
        servicePhoto: cartId?.servicesId?.coverImage || null,
        serviceName: cartId?.servicesId?.name || null,
        clientName: cartId?.userId
          ? `${cartId?.userId?.firstname} ${cartId?.userId?.lastname}`
          : null,
        vendorName: cartId?.servicesId?.userId
          ? `${cartId?.servicesId?.userId?.firstname} ${cartId?.servicesId?.userId?.lastname}`
          : null,
        status: cartId?.status || null,
        paymentStatus: cartId?.cartPaymentStatus || null,
        total: cartId?.cartPrice || null,
        paymentId: items?.paymentId || null,
        cartId: cartId?._id || null,
        isReported: cartId?.isReported || false,
        clientId: cartId?.userId?._id || null,
        vendorId: cartId?.servicesId?.userId?._id || null,
      };

      responseArray.push(responseObject);
    });
  });

  res.status(200).json(responseArray);
});

// WE WILL MAKE REFUND API SOON
//  @desc   :  Refund payments to client
//  @Route  :  POST /admins/payment/refund/:id/:total/:cartId
//  @access :  Public
const refundPayment = asyncHandler(async (req, res) => {
  const paymentId = req.params.id;
  const amountToRefund = req.params.total;
  const cartId = req.params.cartId;

  // const refund = await refundSpecificAmountStripe(paymentId, amountToRefund);
  // if (refund.status === "succeeded") {
  //   await Carts.updateOne(
  //     { _id: cartId },
  //     { $set: { cartPaymentStatus: "Refunded", status: "Dispute" } },
  //     { new: true }
  //   );
  // }

  await Carts.updateOne(
    { _id: cartId },
    { $set: { cartPaymentStatus: "Refunded", status: "Dispute" } },
    { new: true }
  );
  
  res.status(200).json("Payment has been refunded!");
});

//  @desc   :  Refund payments to client
//  @Route  :  POST /admins/payment/refund/:id/:total/:cartId
//  @access :  Public
const releasePayment = async (req, res) => {
  const paymentId = req.params.id;
  const amountToRefund = req.params.total;
  const cartId = req.params.cartId;

  const refund = await releaseStripe(paymentId, amountToRefund);
  await Carts.updateOne(
    { _id: cartId },
    { $set: { cartPaymentStatus: "Released" } },
    { new: true }
  );
console.log("test")
  return res.status(200).json("Payment has been released!");
};

//  @desc   :  Change the report status
//  @Route  :  POST /admins/payment/report/:id
//  @access :  Public
const reportCart = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Carts.updateOne(
    { _id: id },
    { $set: { isReported: false } },
    { new: true }
  );
  res.status(200).json("Report status has been changed");
});

// ---------------------------------------------------- CLIENTS -----------------------------------------------------
//  @desc   :  Get All Clients
//  @Route  :  GET /admins/client
//  @access :  Public
const getAllClients = asyncHandler(async (req, res) => {
  const allClients = await Users.find({ type: "Client" })
    .select("-password")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json(allClients);
});

//  @desc   :  Delete Client
//  @Route  :  DELETE /admins/client/:id
//  @access :  Public
const deleteClient = asyncHandler(async (req, res) => {
  const id = req.params.id;

  await Users.findByIdAndDelete(id);

  res.status(200).json("Client has been deleted");
});

//  Exporting the routes
module.exports = {
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
  deleteService,
};
