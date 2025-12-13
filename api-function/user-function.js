const Admin = require("../models/admin");
const User = require("../models/user");
const assignmentCompleted = require("../models/assignment-completed");
const assignmentCreated = require("../models/assignment-created");
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
    await AssignmentCompleted.create({
      user: userId,
      assignment: assignmentId,
      completedTime: new Date(),
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { setOfAssignmentsAssigned: assignmentId },
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

exports.submitTest = async (req, res) => {
  try {
    const { userId, assignmentId } = req.body;
    const assignmentDetails = await AssignmentCreated.findById(assignmentId);
    if (!assignmentDetails) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }
    if (new Date() > new Date(assignmentDetails.deadline)) {
      return res.status(400).json({
        success: false,
        message: "Deadline crossed. Submission not allowed",
      });
    }
    const alreadySubmitted = await assignmentCompleted.findOne({
      user: userId,
      assignment: assignmentId,
    });
    if (alreadySubmitted) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this test",
      });
    }
    const completeAssignment = await assignmentCompleted.create({
      user: userId,
      assignment: assignmentId,
      submittedAt: new Date(),
    });
    await assignmentCreated.findByIdAndUpdate(
      assignmentId,
      { $push: { assignmentCompleted: completeAssignment._id } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Test submitted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};
  