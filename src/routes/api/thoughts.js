const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  postThought,
  updateThought,
  deleteThought,
  useThought,
} = require("../../controllers/api/thoughts");
const reactions = require("./reactions");

router.get("/", getAllThoughts);
router.get("/:id", getSingleThought);
router.post("/", postThought);
router.put("/:id", updateThought);
router.delete("/:id", deleteThought);
router.use("/reaction", reactions);

module.exports = router;
