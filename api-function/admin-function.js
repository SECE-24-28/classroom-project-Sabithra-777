const admin = require("../models/admin");
const user = require("../models/user");
const Assignment = require("../models/assignment-created");
exports.getAllRequests = async (req, res) => {
  try {
    // const { id } = req.params;
    const { id } = req.query;
    console.log("Get all requests:", id);
    const getDetails = await admin.findById(id).populate("listOfRequest");
    return res.status(200).json({
      success: true,
      data: getDetails.listOfRequest,
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      error: e,
    });
  }
};
exports.acceptOrDecline = async (req, res) => {
  try {
    const { adminId, userId, select } = req.body;
    if (select === 1) {
      await user.findByIdAndUpdate(userId, { active: true }, { new: true });
    }
    await admin.findByIdAndUpdate(
      adminId,
      {
        $pull: { listOfRequest: userId },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Process is done successfully",
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      error: e,
    });
  }
};

exports.createAssignments = async (req, res) => {
  try {
    const { assignmentName, deadLine, adminId } = req.body;
    const createAssignment = await Assignment.create({
      assignmentName: assignmentName,
      deadline: deadLine,
    });
    const pushAssignment = await admin.findByIdAndUpdate(
      id,
      {
        $push: { listOfAssignments: createAssignment._id },
      },
      { new: true }
    );
    const collegeName = pushAssignment.collegeName;
    const assignAssignments = await user.updateMany(
      { collegeName: collegeName },
      { $push: { setOfAssignmentsAssigned: createAssignment._id } }
    );
    return res.status(200).json({
      success: true,
      message: "Process is done successfully",
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      error: e,
    });
  }
};
