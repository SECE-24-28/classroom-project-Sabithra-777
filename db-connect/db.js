const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/LMS_BACKEND");
    console.log("LMS_BACKEND Db connected");
  } catch (e) {
    console.error("DB connection failed", e.message);
  }
};

