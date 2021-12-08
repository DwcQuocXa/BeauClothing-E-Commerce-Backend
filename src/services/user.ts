import User, { UserDocument } from "../models/User";
import mongoose from "mongoose";
import { NotFoundError } from "../helpers/apiError";

const findAll = async (): Promise<UserDocument[]> => {
  return User.find();
};

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} is not found`);
  }

  return foundUser;
};

const findOrCreate = async (payload: Partial<UserDocument>) => {
  const user = await User.findOne();

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
};

const banOrUnbanUser = async (userId: string): Promise<UserDocument> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  user.isBanned = !user.isBanned;
  return user.save();
};

const getCart = async (userId: string): Promise<UserDocument> => {
  const user = await User.findById(userId).populate("cart.product");

  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  return user;
};

const addProductToCart = async (
  productId: string,
  userId: string
): Promise<UserDocument> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  // Check if exist
  const existedProduct = user.cart.find(
    (item) => item.product.toHexString() == productId
  );
  if (existedProduct) {
    // Increase the quantity by one
    existedProduct.quantity++;
  } else {
    // Add new product to cart
    user.cart = [
      ...user.cart,
      { product: mongoose.Types.ObjectId(productId), quantity: 1 },
    ];
  }

  return user
    .save()
    .then((user) => user.populate("cart.product").execPopulate());
};

const decreaseQuantityOfProduct = async (
  productId: string,
  userId: string
): Promise<UserDocument> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  //Check if exist
  const existedProduct = user.cart.find(
    (item) => item.product.toHexString() == productId
  );
  if (existedProduct) {
    // Prevent user from decreasing the quantity if it is one
    if (existedProduct.quantity > 1)
      // Decrease the quantity by one
      existedProduct.quantity--;
  } else {
    throw new Error(`Product ${productId} not found`);
  }

  return user
    .save()
    .then((user) => user.populate("cart.product").execPopulate());
};

const removeProductInCart = async (
  productId: string,
  userId: string
): Promise<UserDocument> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  // Check if exist
  const existedIndex = user.cart.findIndex(
    (item) => item.product.toHexString() == productId
  );
  if (existedIndex !== -1) {
    // If existed, remove that product
    user.cart.splice(existedIndex, 1);
  }

  return user
    .save()
    .then((user) => user.populate("cart.product").execPopulate());
};

export default {
  findAll,
  create,
  findById,
  findOrCreate,
  getCart,
  addProductToCart,
  decreaseQuantityOfProduct,
  removeProductInCart,
  banOrUnbanUser,
};
