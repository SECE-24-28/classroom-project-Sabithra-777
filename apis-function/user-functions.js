const User = require("../models/user");
exports.createUser = async (req, res) => {
  try {
    const { firstName, secondName, email, mobileNumber, password } = req.body;
    const createUser = await User.create({
      firstName,
      secondName,
      email,
      mobileNumber,
      password,
    });
    return res.status(200).json({
      success: true,
      message: "User is created successfully",
      data: createUser,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

exports.createManyUsers = async (req, res) => {
  try {
    const { users } = req.body;
    const createUsers = await User.insertMany(users);
    return res.status(200).json({
      success: true,
      message: "Users created successfully",
      data: createUsers,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};