const express = require("express");
const {
  getAllRequests,
  acceptOrDecline,
  createAssignments,
  deactivateUser,
  submitTest,
  getAssignmentResults,
} = require("../api-function/admin-function");
const router = express.Router();
router.get("/getRequests", getAllRequests);
router.post("/acceptorDelete", acceptOrDecline);
router.post("/createAssignments", createAssignments);
router.put("/deactivateUser", deactivateUser);
router.get("/getAssignmentResults", getAssignmentResults);
// router.put("/submitTest", submitTest);
module.exports = router;
