import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default PostModel;
