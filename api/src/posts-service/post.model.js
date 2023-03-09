const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    message: { type: String },
    name: { type: String },
    creator: { type: String },
    tags: { type: [String] },
    selectedFile: { type: String },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    // createdAt: {
    //   type: Date,
    //   default: new Date(),
    // },
  },
  { timestamps: true }
);

postSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Posts", postSchema);
