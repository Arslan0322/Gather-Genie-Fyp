const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId], // Specify the type as an array of ObjectId
      ref: "Users", // You can add a reference to the User model if necessary
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chats", ChatSchema);

module.exports = ChatModel;