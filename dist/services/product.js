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
const Product_1 = __importDefault(require("../models/Product"));
const apiError_1 = require("../helpers/apiError");
const create = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return product.save();
});
const findById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findById(productId);
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} is not found`);
    }
    return foundProduct;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Product_1.default.find().sort({ name: 1 });
});
const update = (productId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findByIdAndUpdate(productId, update, {
        new: true,
    });
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} is not found`);
    }
    return foundProduct;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = Product_1.default.findByIdAndDelete(productId);
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} is not found`);
    }
    return foundProduct;
});
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteProduct,
};
//# sourceMappingURL=product.js.map