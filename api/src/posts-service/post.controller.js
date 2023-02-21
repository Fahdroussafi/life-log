const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("./post.model");

// @route POST api/posts/createPost
// @desc Create a post
// @access Private
const CreatePost = asyncHandler(async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).json({
      newPost: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// @route GET api/posts/getposts
// @desc Get all posts
// @access Private
const GetPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      posts: posts,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ messasge: error.message });
  }
});

// @route PATCH api/posts/:id
// @desc Update a post
// @access Private
const UpdatePost = asyncHandler(async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(201).send({
    updatedPost: updatedPost,
    message: "Post updated successfully",
  });
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
const DeletePost = asyncHandler(async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const deletedPost = await Post.findByIdAndRemove(_id);

  res.status(201).send({
    deletedPost: deletedPost,
    message: "Post deleted successfully",
  });
});

// @route PATCH api/posts/:id/likepost
// @desc Like a post
// @access Private
const LikePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

module.exports = {
  CreatePost,
  GetPosts,
  UpdatePost,
  DeletePost,
  LikePost,
};
