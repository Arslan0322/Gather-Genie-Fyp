const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    cartId:[{
        type: mongoose.Types.ObjectId,
        ref: "Carts"
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    },
    total: {
        type: Number
    },
    amount: {
        type: Number
    },
    paymentId: {
        type: String
    },
    paymentStatus:{
      type: String,
      default: "Confirm"
    }
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Bookings', bookingSchema);

module.exports = Booking;