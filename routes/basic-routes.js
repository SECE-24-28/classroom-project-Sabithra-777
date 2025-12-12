const express = require("express");
const {
  createUser,
  createManyUsers,
  getAllUsers,
  updateEmail,
} = require("../apis-function/user-functions");
const router = express.Router();
router.post("/userSignup", createUser);
router.post("/userSignupMany", createManyUsers);
router.get("/getUsers", getAllUsers);
router.put("/modifyMail", updateEmail);
module.exports = router;