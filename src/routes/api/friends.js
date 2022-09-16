const { Router } = require("express");

const {
  createFriendForUser,
  deleteFriendByUser,
} = require("../../controllers/api/friends");

const router = Router({ mergeParams: true });

router.post("/", createFriendForUser);
router.delete("/:friendId", deleteFriendByUser);

module.exports = router;
