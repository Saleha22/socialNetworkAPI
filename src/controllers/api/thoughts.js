const connectToDatabase = require("../../../config/connection");
const { Thought } = require("../../models");

const getAllThoughts = async (req, res) => {
  try {
    // await connectToDatabase();
    const AllThoughts = await Thought.find({});
    console.log("all thoughts: " + AllThoughts);
    return res.json({ success: true, AllThoughts });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thoughts | ${error.message}`);

    return res
      .status(500)
      .json({ success: false, error: "Failed to get thoughts" });
  }
};

const getSingleThought = async (req, res) => {
  try {
    const { id } = req.params;
    const thoughtById = await Thought.findById(id);
    console.log(thoughtById);

    if (!thoughtById) {
      console.log(`[ERROR]: Thought not found`);
      return res
        .status(404)
        .json({ success: false, error: "Thought not found" });
    }

    return res.json({ success: true, thoughtById });
  } catch (error) {
    console.log(`[ERROR]: Failed to get thought | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get thought" });
  }
};
const postThought = async (req, res) => {
  try {
    const { userName, thoughtText } = req.body;
    console.log(userName);
    const newThought = await Thought.create({
      userName,
      thoughtText,
    });
    console.log("thought created");
    console.log(newThought);
    return res.json({ success: true, newThought });
  } catch (error) {
    console.log(`[ERROR]: Failed to create thought | ${error.message}`);

    return res
      .status(500)
      .json({ success: false, error: "Failed to create thought" });
  }
};
const updateThought = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, thoughtText } = req.body;

    if (req.body) {
      const updatedThought = await Thought.findByIdAndUpdate(id, req.body);
      return res.json({ success: true, updatedThought });
    } else {
      console.log("Can't update thought");
      return res
        .status(500)
        .json({ success: false, error: "Failed to update thought" });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to update thought | ${error.message}`);

    return res
      .status(500)
      .json({ success: false, error: "Failed to update thought" });
  }
};

const deleteThought = async (req, res) => {
  try {
    const { id } = req.params;
    // // if (!name) {
    // //   console.log(`[ERROR]: thought not found`);
    // //   return res
    // //     .status(404)
    // //     .json({ success: false, error: "Friend not found" });
    // }
    const deletedThought = await Thought.findByIdAndDelete(id);
    console.log("Thought deleted");
    return res.json({ success: true, deletedThought });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete thought | ${error.message}`);

    return res
      .status(500)
      .json({ success: false, error: "Failed to delete thought" });
  }
};

const useThought = () => {
  console.log("use thought");
};

module.exports = {
  getAllThoughts,
  getSingleThought,
  postThought,
  updateThought,
  deleteThought,
  useThought,
};
