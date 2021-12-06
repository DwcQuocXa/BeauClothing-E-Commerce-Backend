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
exports.mongo = void 0;
const errorhandler_1 = __importDefault(require("errorhandler"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
//import { MONGODB_URI } from "./util/secrets";
dotenv_1.default.config({ path: ".env" });
const PORT = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URI;
const mongo = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default
        .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => {
        // Start Express server
        app_1.default.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
        .catch((error) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " +
            error);
        process.exit(1);
    });
});
exports.mongo = mongo;
(0, exports.mongo)();
/**
 * Error Handler. Provides full stack - remove for production
 */
app_1.default.use((0, errorhandler_1.default)());
//# sourceMappingURL=server.js.map