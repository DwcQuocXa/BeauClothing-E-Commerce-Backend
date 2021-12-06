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
const user_1 = __importDefault(require("../services/user"));
const GoogleTokenStrategy = require("passport-google-id-token");
const GOOGLE_CLIENT_ID = "634958478111-32garfk7ttd62rvjpp3tqmp0f58ijdsn.apps.googleusercontent.com";
exports.default = new GoogleTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
}, console.log("backend connect to google"), function (parsedToken, googleId, done) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(parsedToken);
        const userPayload = {
            email: (_a = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payload) === null || _a === void 0 ? void 0 : _a.email,
            firstName: (_b = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payload) === null || _b === void 0 ? void 0 : _b.firstName,
            lastName: (_c = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payload) === null || _c === void 0 ? void 0 : _c.lastName,
        };
        try {
            const user = yield user_1.default.findOrCreate(userPayload);
            done(undefined, user);
            console.log("To the authenticate controller");
        }
        catch (error) {
            done(error);
        }
    });
});
//# sourceMappingURL=passport.js.map