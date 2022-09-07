import { Schema, Document, model } from "mongoose";

export interface PostDB extends Document, Post {}

export interface Post {
  createdAt: Date;
  message: string;
  img: string[];
  coords: string;
  user: string;
}

const postSchema = new Schema({
  createdAt: {
    type: Date,
  },
  message: {
    type: String,
  },
  img: [
    {
      type: String,
    },
  ],
  coords: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Reference to a user must exist"],
  },
});

postSchema.pre<PostDB>("save", function (next) {
  this.createdAt = new Date();
  next();
});

export const Post = model<PostDB>("Post", postSchema);
