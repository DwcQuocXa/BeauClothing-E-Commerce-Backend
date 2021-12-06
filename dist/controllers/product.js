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
exports.findAll = exports.findById = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const product_1 = __importDefault(require("../services/product"));
const apiError_1 = require("../helpers/apiError");
// POST /products
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("admin router");
    try {
        const { name, description, categories, sizes, price, img } = req.body;
        const newProduct = new Product_1.default({
            name,
            description,
            categories,
            sizes,
            price,
            img,
        });
        console.log(newProduct);
        console.log("admin router");
        yield product_1.default.create(newProduct);
        res.json(newProduct);
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Product not found", error));
    }
});
exports.createProduct = createProduct;
// PUT /products/:productId
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const productId = req.params.productId;
        const updateProduct = yield product_1.default.update(productId, update);
        res.json(updateProduct);
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Product not found", error));
    }
});
exports.updateProduct = updateProduct;
// DELETE /products/:productId
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.default.deleteProduct(req.params.productId);
        res.status(204).end();
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Product not found", error));
    }
});
exports.deleteProduct = deleteProduct;
// GET /products/:productId
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findById(req.params.productId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Product not found", error));
    }
});
exports.findById = findById;
// GET /products
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findAll());
    }
    catch (error) {
        next(new apiError_1.NotFoundError("Product not found", error));
    }
});
exports.findAll = findAll;
//# sourceMappingURL=product.js.map