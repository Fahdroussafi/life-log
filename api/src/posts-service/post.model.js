const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    name: { type: String },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: { type: [String], required: true },
    selectedFile: { type: String, required: true },
    likes: { type: [String], default: [] },
    comments: [
      {
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

postSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Posts", postSchema);
