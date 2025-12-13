const express = require("express");
const {
  getAllRequests,
  acceptOrDecline,
  createAssignment,
  deactivateUser,
  fetchResult,
} = require("../api-function/admin-function");
const router = express.Router();
router.get("/getAllRequests/:id", getAllRequests);
router.post("/acceptOrDecline", acceptOrDecline);
router.post("/createAssignment", createAssignment);
router.put("/deactivateUser", deactivateUser);
router.get("/fetchResult", fetchResult);
module.exports = router;
