const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      default: null,
    },
    venueType: {
      type: String,
    },
    carModel: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    teamMembers: {
      type: String,
    },
    town: {
      type: String,
      default: null,
    },
    eventType: [],
    cuisine: [],
    multipleImages: { type: String },
    status: {
      type: String,
      default: "Pending",
    },
    amenities: [],
    equipment: [],
    decorType:[]
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Services", serviceSchema);

module.exports = Service;
