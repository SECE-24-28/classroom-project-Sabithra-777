const express = require("express");
const {
  createUser,
  createManyUsers,
} = require("../apis-function/user-functions");
const router = express.Router();
router.post("/userSignup", createUser);
router.post("/userSignupMany", createManyUsers);
module.exports = router;