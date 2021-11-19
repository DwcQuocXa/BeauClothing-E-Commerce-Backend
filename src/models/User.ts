import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  isAdmin?: boolean;
  isBanned?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
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
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: false,
  },
});

export default mongoose.model<UserDocument>("User", userSchema);
