const admin = require("../models/admin");
const user = require("../models/user");
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
