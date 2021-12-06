"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.get("/", product_1.findAll);
router.get("/:productId", product_1.findById);
router.put("/:productId", product_1.updateProduct);
router.delete("/:productId", product_1.deleteProduct);
router.post("/", product_1.createProduct);
exports.default = router;
//# sourceMappingURL=product.js.map