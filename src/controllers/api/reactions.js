// const { Thought } = require("../../models");

const createReactionForThought = async (req, res) => {
  try {
    //get the thought id from reqest parameteres
    const { thoughtId } = req.params;

    //push the new reaction into the reactions array for that specific thought id
    const data = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $push: { reactions: { ...req.body } },
      },
      { new: true }
    );

    return res.json({ success: true, data });
  } catch (error) {
    console.log(
      `[ERROR]: Failed to create a new reaction for present thought | ${error.message}`
    );

    return res.status(404).json({
      success: false,
      error: "Failed to create a new reaction for present thought",
    });
  }
};

const deleteReactionByThought = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const data = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $pull: { reactions: { _id: reactionId } },
      },
      { new: true }
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete reaction | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to delete reaction" });
  }
};

module.exports = { createReactionForThought, deleteReactionByThought };
