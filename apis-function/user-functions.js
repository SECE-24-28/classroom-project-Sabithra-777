const User = require("../models/user");
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const creatUser = await User.insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    return res.status(201).json({
      success: true,
      message: "User is created successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e,
    });
  }
};

exports.createManyUsers = async (req, res) => {
  try {
    const { details } = req.body;
    const createUser = await User.insertMany(details);
    return res.status(201).json({
      success: true,
      message: "Users created successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const getDetails = await User.find();
    // console.log("The users details:", getDetails);
    return res.status(200).json({
      success: true,
      data: getDetails,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e,
    });
  }
};
exports.updateEmail = async (req, res) => {
  try {
    const {firstName, email } = req.body;
    const updateResult = await User.updateOne(
      { firstName: firstName },
      { $set: { email: email } }
    );
    
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Email updated successfully",
      modifiedCount: updateResult.modifiedCount
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e,
    });
  }
};