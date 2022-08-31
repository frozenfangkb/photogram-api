import { Schema, model, Document } from "mongoose";

export interface IUser extends Document, User {}

export interface User {
  name: string;
  avatar?: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
  },
  avatar: {
    type: String,
    default: "av-1.png",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is mandatory"],
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
});

export const UserModel = model<IUser>("User", userSchema);
