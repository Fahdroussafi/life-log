const express = require("express");
const router = express.Router();
const {
  CreatePost,
  UpdatePost,
  DeletePost,
  GetPosts,
  LikePost,
  CommentPost,
  getPostsBySearch,
  getPostsByCreator,
  getPost,
} = require("../posts-service/post.controller");

const { auth } = require("../middleware/jwt.middleware");

router.post("/createPost", auth, CreatePost);
router.get("/getPosts", GetPosts);
router.patch("/:id", UpdatePost);
router.delete("/:id", DeletePost);
router.patch("/:id/likePost", auth, LikePost);

// router.get('/:id', getPost);
// router.get("/creator", getPostsByCreator);
router.get("/search", getPostsBySearch);
router.post("/:id/commentPost", CommentPost);

module.exports = router;
