const { Thought } = require("../../models");

const getThoughts = async (req, res) => {
  try {
    const data = await Thought.find({});
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thoughts | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to get thoughts" });
  }
};

const getThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const data = await Thought.findById(thoughtId);
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thought | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to get thought" });
  }
};

const createThought = async (req, res) => {
  try {
    const { userName, thoughtText } = req.body;
    if (userName && thoughtText) {
      const data = await Thought.create({ userName, thoughtText });
      return res.json({ success: true, data });
    }
    return res.status(404).json({
      success: false,
      error: "Please complete the required fields",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create new thought | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to create new thought" });
  }
};

const updateThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const data = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        ...req.body,
      },
      { new: true }
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to update thought | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Failed to update thought" });
  }
};

const deleteThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    return res.json({ success: true, data: deletedThought });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete thought | ${error.message}`);
    return res
      .status(404)
      .json({ success: false, error: "Please provide correct ID" });
  }
};

module.exports = {
  getThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
};
