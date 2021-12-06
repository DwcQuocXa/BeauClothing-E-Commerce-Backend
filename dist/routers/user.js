"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get("/", user_1.findAll);
router.get("/cart", user_1.getCart);
router.put("/cart", user_1.manageProductInCart);
router.delete("/cart", user_1.removeProductInCart);
exports.default = router;
//# sourceMappingURL=user.js.map