import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  avatar: string;
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

export const User = model<IUser>("User", userSchema);
