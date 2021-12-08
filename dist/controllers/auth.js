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
exports.findByEmail = exports.authenticate = exports.signUp = exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const apiError_1 = require("../helpers/apiError");
dotenv_1.default.config({ path: ".env" });
const JWT_SECRET = process.env.JWT_SECRET;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(404).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            next(new apiError_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(new apiError_1.InternalServerError("Internal Server Error", error));
        }
    }
});
exports.signIn = signIn;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exist" });
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        //const isAdmin = email === "duc.ngogia2002@gmail.com" ? true : false;
        const result = yield User_1.default.create({
            isAdmin: email === "duc.ngogia2002@gmail.com",
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });
        const token = jsonwebtoken_1.default.sign({ email: result.email, id: result._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: result, token });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            next(new apiError_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(new apiError_1.InternalServerError("Internal Server Error", error));
        }
    }
});
exports.signUp = signUp;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { result } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email: result.email });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ result: existingUser, token });
        }
        const token = jsonwebtoken_1.default.sign({
            email: result.email,
            id: result._id,
        }, JWT_SECRET, { expiresIn: "1h" });
        const resultGoogle = yield User_1.default.create({
            firstName: result.givenName,
            lastName: result.familyName,
            email: result.email,
        });
        res.status(200).json({ result: resultGoogle, token });
    }
    catch (error) {
        return next(new apiError_1.InternalServerError());
    }
});
exports.authenticate = authenticate;
const findByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        res.status(200).json(yield User_1.default.findOne({ email }));
    }
    catch (error) {
        return next(new apiError_1.InternalServerError());
    }
});
exports.findByEmail = findByEmail;
//# sourceMappingURL=auth.js.map