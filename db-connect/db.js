const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Db is connected");
  } catch (e) {
    console.error("Error in connecting to the db", e.message);
  }
};