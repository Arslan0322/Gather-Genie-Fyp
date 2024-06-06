const mongoose = require("mongoose");

const addOnSchema = mongoose.Schema(
  {
    servicesId: {
      type: mongoose.Types.ObjectId,
      ref: "Services",
    },
    addOn: [],
  },
  {
    timestamps: true,
  }
);

const AddOns = mongoose.model("AddOns", addOnSchema);

module.exports = AddOns;
