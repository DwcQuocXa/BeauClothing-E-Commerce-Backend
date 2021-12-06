"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        index: true,
        uppercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: String,
    sizes: {
        type: Array,
        //default: ["XS", "S", "M", "L", "XL"],
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: [String],
        required: false,
    },
});
exports.default = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=Product.js.map