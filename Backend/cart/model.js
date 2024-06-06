const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    servicesId: {
      type: mongoose.Types.ObjectId,
      ref: "Services",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    eventDate: {
      type: String,
      require: true,
    },
    eventTime: {
      type: String,
      require: true,
    },
    endTime:{
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
    },
    location: {
      type: String,
    },
    hours: {
      type: String,
    },
    option: {
      type: String,
    },
    cartPrice: {
      type: Number,
    },
    cartPaymentStatus: {
      type: String,
      default: "Pending"
    },
    isReported: {
      type: Boolean,
      default: false
    },
    addOn:[],
    dateTime:[],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
