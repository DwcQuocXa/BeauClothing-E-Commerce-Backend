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
exports.removeProductInCart = exports.manageProductInCart = exports.getCart = exports.banOrUnbanUser = exports.findAll = void 0;
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.findAll());
    }
    catch (error) {
        if (error.statusCode === 403)
            next(new apiError_1.ForbiddenError(error.message));
        next(new apiError_1.NotFoundError("User not found", error));
    }
});
exports.findAll = findAll;
//PUT /users
const banOrUnbanUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.banOrUnbanUser(req.body.userId));
    }
    catch (error) {
        if (error.statusCode === 403)
            next(new apiError_1.ForbiddenError(error.message));
        next(new apiError_1.NotFoundError("User not found", error));
    }
});
exports.banOrUnbanUser = banOrUnbanUser;
// GET /users/cart
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.getCart(req.body.userId);
        res.json(user.cart);
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Cart not found", error));
    }
});
exports.getCart = getCart;
// PUT /users/cart
const manageProductInCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const isIncreased = req.body.isIncreased;
        if (isIncreased) {
            const updatedUser = yield user_1.default.addProductToCart(productId, userId);
            res.json(updatedUser.cart);
        }
        else {
            const updatedUser = yield user_1.default.decreaseQuantityOfProduct(productId, userId);
            res.json(updatedUser.cart);
        }
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Product not found", error));
    }
});
exports.manageProductInCart = manageProductInCart;
// DELETE /users/cart
const removeProductInCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const updatedUser = yield user_1.default.removeProductInCart(productId, userId);
        res.json(updatedUser.cart);
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Product not found", error));
    }
});
exports.removeProductInCart = removeProductInCart;
//# sourceMappingURL=user.js.map