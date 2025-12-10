const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/User_db");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
//get

//post

//put

//delete