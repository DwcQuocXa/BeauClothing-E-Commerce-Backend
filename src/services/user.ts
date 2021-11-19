import User, { UserDocument } from "../models/User";
import mongoose from "mongoose";

async function findAll(): Promise<UserDocument> {
  return User.find().exec().then();
}

async function create(user: UserDocument): Promise<UserDocument> {
  return user.save();
}

async function findOrCreate(payload: Partial<UserDocument>) {
  return User.findOne()
    .exec()
    .then((user) => {
      if (!user) {
        const newUser = new User({
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
        });
        newUser.save();
        return newUser;
      }
      return user;
    });
}

export default {
  findAll,
  create,
  findOrCreate,
};
