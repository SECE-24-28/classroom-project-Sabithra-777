const User = require("../models/user");
const Admin = require("../models/admin");
const AssignmentCreated = require("../models/assignment-created");
const mongoose = require("mongoose");
exports.createUser = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      email,
      mobileNumber,
      collegeName,
      active,
      password,
    } = req.body;
     const [checkDetails, checkAdminDetails] = await Promise.all([
      User.findOne({ mobileNumber, email }),
      Admin.findOne({ mobileNumber, email }),
    ]);
    if (checkDetails || checkAdminDetails) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const userDetails = await User.create({
      firstName,
      secondName,
      email,
      mobileNumber,
      collegeName,
      active: false,
      password,
    });

    await Admin.findOneAndUpdate(
      { collegeName: collegeName },
      { $push: { listOfRequest: userDetails._id } }
    );
    return res.status(200).json({
      success: true,
      message: "User is created successfully",
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e,
    });
  }
};
exports.adminSignup = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      email,
      mobileNumber,
      collegeName,
      password,
    } = req.body;
    const checkCollege = await Admin.findOne({ collegeName });
    if (checkCollege) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }
    const [checkDetails, checkUserDetails] = await Promise.all([
      Admin.findOne({ mobileNumber, email }),
      User.findOne({ mobileNumber, email }),
    ]);
    if (checkDetails || checkUserDetails) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }
    const createAdmin = await Admin.create({
      firstName,
      secondName,
      email,
      mobileNumber,
      collegeName,
      password,
    });
    return res.status(200).json({
      success: true,
      message: "Admin is created",
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e,
    });
  }
};
 
exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;  
      // console.log("hi");
      console.log("Requested ID:", id);
    const getDetails = await User.findById(id);
   
    return res.status(200).json({
      success: true,
      data: getDetails,
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      error: e,
    });
  }
};


exports.fetchAssignments = async (req, res) => {
  try {
    const { userId } = req.query;
    const getAssignments = await User.findById(userId).populate(
      "setOfAssignmentsAssigned"
    );
    return res.status(200).json({
      success: true,
      assignmentList: getAssignments.setOfAssignmentsAssigned,
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e,
    });
  }
};

exports.completeAssignment = async (req, res) => {
  try {
    const { userId, assignmentId } = req.body;
    await User.findByIdAndUpdate(
      userId,
      { 
        $pull: { setOfAssignmentsAssigned: assignmentId },
        $push: { setOfAssignmentsCompleted: assignmentId } 
      },  
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Assignment marked as completed",
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e,
    });
  }
};