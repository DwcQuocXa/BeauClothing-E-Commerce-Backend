"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
const product_1 = __importDefault(require("./routers/product"));
const user_1 = __importDefault(require("./routers/user"));
const auth_1 = __importDefault(require("./routers/auth"));
const admin_1 = __importDefault(require("./routers/admin"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const app = (0, express_1.default)();
app.set("port", process.env.PORT);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.use("/api/v1/products", product_1.default);
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/admin", admin_1.default);
app.get("/", (req, res) => {
    res.send("Deploy successfully");
});
app.use((0, errorhandler_1.default)());
exports.default = app;
//# sourceMappingURL=app.js.map