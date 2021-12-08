import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User, { UserDocument } from "../models/User";
import { BadRequestError, InternalServerError } from "../helpers/apiError";

dotenv.config({ path: ".env" });

const JWT_SECRET = process.env.JWT_SECRET as string;

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

    //const isAdmin = email === "duc.ngogia2002@gmail.com" ? true : false;

    const result = await User.create({
      isAdmin: email === "duc.ngogia2002@gmail.com",
      email: email,
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
  const { result } = req.body;

  try {
    const existingUser = await User.findOne({ email: result.email });

    if (existingUser) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ result: existingUser, token });
    }

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const resultGoogle = await User.create({
      firstName: result.givenName,
      lastName: result.familyName,
      email: result.email,
    });

    res.status(200).json({ result: resultGoogle, token });
  } catch (error) {
    return next(new InternalServerError());
  }
};

export const findByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    res.status(200).json(await User.findOne({ email }));
  } catch (error) {
    return next(new InternalServerError());
  }
};
