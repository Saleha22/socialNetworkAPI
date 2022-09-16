// import { ObjectId } from "mongoose";
const { Thought } = require("../../models");

const addReaction = async (req, res) => {
  try {
    const { id } = req.params;

    const { reactionBody, userName } = req.body;

    const thoughtToUpdate = await Thought.findByIdAndUpdate(id, {
      $push: { reactions: req.body },
    });

    return res.status(201).json({
      success: true,
      thoughtToUpdate,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to add reaction | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to add reaction" });
  }
};

const deleteReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { reactionId } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(id, {
      $pull: { reactions: { reactionId: reactionId } },
    });
    return res.status(201).json({
      success: true,
      data: updatedThought,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to delete reaction | ${error.message}]`);
    return res.status(500).json({
      success: false,
      error: "Failed to delete reaction",
    });
  }
};

module.exports = {
  addReaction,
  deleteReaction,
};
