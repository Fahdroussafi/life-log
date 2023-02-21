const express = require("express");
const router = express.Router();
const {
  CreatePost,
  UpdatePost,
  DeletePost,
  GetPosts,
  LikePost,
} = require("../posts-service/post.controller");

const { auth } = require("../middleware/jwt.middleware");

router.post("/createpost", CreatePost);
router.get("/getposts", GetPosts);
router.patch("/:id", UpdatePost);
router.delete("/:id", DeletePost);
router.patch("/:id/likepost", auth, LikePost);

module.exports = router;
