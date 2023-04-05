const express = require("express");
const router = express.Router();
const {
  CreatePost,
  DeletePost,
  GetPosts,
  LikePost,
  CommentPost,
  getPostsBySearch,
  getPostsByCreator,
  getPost,
  getLikeCount,
  checkIfLiked,
} = require("../posts-service/post.controller");

const { auth } = require("../middleware/jwt.middleware");

router.get("/creator", auth, getPostsByCreator);
router.post("/createPost", auth, CreatePost);
router.get("/search", getPostsBySearch);
router.get("/:id/likesCount", getLikeCount);
router.get("/getPosts", GetPosts);
router.patch("/:id/likePost", auth, LikePost);
router.delete("/:id/delete", auth, DeletePost);
router.get("/:id/checkIfLiked", auth, checkIfLiked);
router.post("/:id/commentPost", auth, CommentPost);
router.get("/:id", getPost);

module.exports = router;
