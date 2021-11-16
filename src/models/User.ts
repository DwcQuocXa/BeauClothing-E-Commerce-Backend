import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  isAdmin: boolean;
  isBanned: boolean;
  name: string;
  email: string;
  password: string;
};

export const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<UserDocument>("User", userSchema);
