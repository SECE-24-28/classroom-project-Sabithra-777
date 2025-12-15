// const mongoose = require("mongoose");
// exports.connect = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/sri-eshwar-backend-2");
//     console.log("Db is connected");
//   } catch (e) {
//     console.log("Error in connecting to the db");
//   }
// };

//get

//post

//put

//delete

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
