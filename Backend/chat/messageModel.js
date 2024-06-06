const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
        type: mongoose.Types.ObjectId,
        ref: "Chats"
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    text: {
      type: String,
    },
    senderType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Messages", MessageSchema);

module.exports = MessageModel;