const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("./post.model");

// @route POST api/posts/createPost
// @desc Create a post
// @access Private
const CreatePost = asyncHandler(async (req, res) => {
  const { title, message, tags, selectedFile } = req.body;
  if (!title || !message || !tags || !selectedFile) {
    res.status(400);
    throw new Error("PLEASE FILL ALL THE FIELDS");
  }

  const newPostMessage = new Post({
    title,
    message,
    selectedFile,
    tags,
    creator: req.userId,
  });

  try {
    await newPostMessage.save();

    // retrieve the new post message from the database with the creator field populated
    const populatedPostMessage = await Post.findById(
      newPostMessage._id
    ).populate("creator", "name");

    // return the post message with the creator's name
    res.status(201).json({
      _id: populatedPostMessage._id,
      title: populatedPostMessage.title,
      message: populatedPostMessage.message,
      tags: populatedPostMessage.tags,
      selectedFile: populatedPostMessage.selectedFile,
      creator: populatedPostMessage.creator.name,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// @route GET api/posts/getposts
// @desc Get all posts
// @access Private
const GetPosts = asyncHandler(async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 5;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Post.countDocuments({});
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .populate("creator", "name");

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
    // show 5 more posts when the user clicks on the button "Load more"
  } catch (error) {
    res.status(404).json({ message: error.message });
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

// @route POST api/posts/:id/commentpost
// @desc Comment on a post
// @access Private
const CommentPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Post.findById(id);

  post.comments.push(value);

  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
});

// @route GET api/posts/search
// @desc Search for posts
// @access Private

// search for posts by tags and title
const getPostsBySearch = asyncHandler(async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    }).populate("creator", "name");

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  CreatePost,
  GetPosts,
  UpdatePost,
  DeletePost,
  LikePost,
  CommentPost,
  getPostsBySearch,
};
