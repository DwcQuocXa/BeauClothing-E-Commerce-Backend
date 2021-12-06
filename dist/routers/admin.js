"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.put("/users/ban", user_1.banOrUnbanUser);
router.post("/products", product_1.createProduct);
router.put("/products/:productId", product_1.updateProduct);
router.delete("/products/:productId", product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=admin.js.map