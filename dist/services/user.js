"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = require("../helpers/apiError");
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.find();
});
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return user.save();
});
const findById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findById(userId);
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} is not found`);
    }
    return foundUser;
});
const findOrCreate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne();
    if (!user) {
        const newUser = new User_1.default({
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
        });
        newUser.save();
        return newUser;
    }
    return user;
});
const banOrUnbanUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new Error(`User ${userId} not found`);
    }
    user.isBanned = !user.isBanned;
    return user.save();
});
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId).populate("cart.product");
    if (!user) {
        throw new Error(`User ${userId} not found`);
    }
    return user;
});
const addProductToCart = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new Error(`User ${userId} not found`);
    }
    // Check if exist
    const existedProduct = user.cart.find((item) => item.product.toHexString() == productId);
    if (existedProduct) {
        // Increase the quantity by one
        existedProduct.quantity++;
    }
    else {
        // Add new product to cart
        user.cart = [
            ...user.cart,
            { product: mongoose_1.default.Types.ObjectId(productId), quantity: 1 },
        ];
    }
    return user
        .save()
        .then((user) => user.populate("cart.product").execPopulate());
});
const decreaseQuantityOfProduct = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new Error(`User ${userId} not found`);
    }
    //Check if exist
    const existedProduct = user.cart.find((item) => item.product.toHexString() == productId);
    if (existedProduct) {
        // Prevent user from decreasing the quantity if it is one
        if (existedProduct.quantity > 1)
            // Decrease the quantity by one
            existedProduct.quantity--;
    }
    else {
        throw new Error(`Product ${productId} not found`);
    }
    return user
        .save()
        .then((user) => user.populate("cart.product").execPopulate());
});
const removeProductInCart = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new Error(`User ${userId} not found`);
    }
    // Check if exist
    const existedIndex = user.cart.findIndex((item) => item.product.toHexString() == productId);
    if (existedIndex !== -1) {
        // If existed, remove that product
        user.cart.splice(existedIndex, 1);
    }
    return user
        .save()
        .then((user) => user.populate("cart.product").execPopulate());
});
exports.default = {
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
//# sourceMappingURL=user.js.map