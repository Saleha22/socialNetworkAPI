const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/api/users");

const { addFriend, deleteFriend } = require("../../controllers/api/friends");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/friends/:id", addFriend);
router.delete("/friends/:id", deleteFriend);

module.exports = router;
