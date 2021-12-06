"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post("/signin", auth_1.signIn);
router.post("/signup", auth_1.signUp);
router.post("/google-authenticate", passport_1.default.authenticate("google-id-token", { session: false }), auth_1.authenticate);
exports.default = router;
//# sourceMappingURL=auth.js.map