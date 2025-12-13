const express = require("express");
const {
  getAllRequests,
  acceptOrDecline,
} = require("../api-function/admin-function");
const router = express.Router();
router.get("/getRequests", getAllRequests);
router.post("/acceptorDelete", acceptOrDecline);
module.exports = router;
