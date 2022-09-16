// const connectToDatabase = require("../../../config/connection");
const { User } = require("../../models");

const getUsers = async (req, res) => {
  try {
    const data = await User.find({}).populate("thoughts").populate("friends");
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to get users | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to get users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findById(userId)
      .populate("thoughts")
      .populate("friends");
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to get user | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to get user" });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email } = req.body;
    if (userName && email) {
      const data = await User.create({ userName, email });
      return res.json({ success: true, data });
    }
    return res.status(404).json({
      success: false,
      error: "Please complete the username and email",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create new user | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to create new user" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
      },
      { new: true }
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to update existent user | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to update existent user" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findByIdAndDelete(userId);
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete user | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Please provide correct ID" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
