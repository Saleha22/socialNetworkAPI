const { User } = require("../../models");

const addFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    console.log(id, userId);

    if (id) {
      const friend = await User.findByIdAndUpdate(userId, {
        $push: { friends: id },
      });

      return res.status(201).json({
        success: true,
        data: friend,
      });
    }

    return res.status(400).json({
      success: false,
      error: "Please enter the user ID for the friend.",
    });
  } catch (error) {
    console.log(`[ERROR: Failed to add friend | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to add friend",
    });
  }
};
const deleteFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;
    console.log(id, friendId);

    const updatedUser = await User.findByIdAndUpdate(id, {
      $pull: { friends: friendId },
    });
    console.log(updatedUser);
    return res.status(201).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to delete friend | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to delete friend",
    });
  }
};

module.exports = {
  addFriend,
  deleteFriend,
};
