const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Vendor", "Client"],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    number: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "Pending",
    },
    account: {
      type: String,
      default: null,
    },
    experience: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook in Mongoose, executed before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Check if the password has been modified
    next(); // If not modified, move to the next middleware
  }

  const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password using bcrypt
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
