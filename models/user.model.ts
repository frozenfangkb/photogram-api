import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document, User {
  validatePassword(password: string): boolean;
}

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

userSchema.method(
  "validatePassword",
  function (password: string = ""): boolean {
    return bcrypt.compareSync(password, this.password);
  }
);

export const UserModel = model<IUser>("User", userSchema);
