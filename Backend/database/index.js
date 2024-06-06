const mongoose = require("mongoose");
const fs = require("fs");

const database = async () => {
  mongoose
    .connect("mongodb+srv://arslanali775692:test123@cluster0.ucp7viy.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Mongo...."))
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
      throw error;
    });
};

module.exports = database;
