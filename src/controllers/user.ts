import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password }: UserDocument = req.body;

    const user: UserDocument = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await UserService.create(user);
    res.json(user);
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
  try {
    const { given_name, family_name, email } = req.user as any;
    const token = jwt.sign(
      {
        given_name,
        family_name,
        email,
        // password,
        // isAdmin,
        // isBanned,
      },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.json({ token, given_name, family_name, email });
  } catch (error) {
    return next(new InternalServerError());
  }
};
