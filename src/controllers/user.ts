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

// GET /users/cart
export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserDocument = await UserService.getCart(req.body.userId);
    res.json(user.cart);
  } catch (error) {
    next(new NotFoundError("Cart not found", error));
  }
};

// PUT /users/cart
export const manageProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const isIncreased = req.body.isIncreased;
    if (isIncreased) {
      const updatedUser: UserDocument = await UserService.addProductToCart(
        productId,
        userId
      );
      res.json(updatedUser.cart);
    } else {
      const updatedUser: UserDocument =
        await UserService.decreaseQuantityOfProduct(productId, userId);
      res.json(updatedUser.cart);
    }
  } catch (error) {
    next(new NotFoundError("Product not found", error));
  }
};

// DELETE /users/cart
export const removeProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const updatedUser: UserDocument = await UserService.removeProductInCart(
      productId,
      userId
    );
    res.json(updatedUser.cart);
  } catch (error) {
    next(new NotFoundError("Product not found", error));
  }
};
