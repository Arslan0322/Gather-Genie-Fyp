const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    bookingId:{
        type: mongoose.Types.ObjectId,
        ref: "Bookings"
    },
    cartId: {
        type: mongoose.Types.ObjectId,
        ref: "Carts",
    },
    client:{
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    },
    comment:{
      type: String,
      default: null
  },
  rating:{
      type: Number,
      default: null
  }
    },
    vendor:{
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    },
    comment:{
      type: String,
      default: null
  },
  rating:{
      type: Number,
      default: null
  }
    }
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;