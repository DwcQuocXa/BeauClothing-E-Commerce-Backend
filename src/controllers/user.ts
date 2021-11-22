import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User, { UserDocument } from "../models/User";
import UserService from "../services/user";
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ForbiddenError,
} from "../helpers/apiError";

dotenv.config({ path: ".env" });

const JWT_SECRET = process.env.JWT_SECRET as string;

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.user;
    if (user.isAdmin === true) {
      res.json(await UserService.findAll());
    } else throw new ForbiddenError("User is not admin");
  } catch (error: any) {
    if (error.statusCode === 403) next(new ForbiddenError(error.message));
    next(new NotFoundError("User not found", error));
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(new InternalServerError("Internal Server Error", error));
    }
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: result, token });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      console.log("bad");
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(new InternalServerError("Internal Server Error", error));
    }
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { given_name, family_name, email } = req.user as any;
    const token = jwt.sign(
      {
        given_name,
        family_name,
        email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, given_name, family_name, email });
  } catch (error) {
    return next(new InternalServerError());
  }
};
