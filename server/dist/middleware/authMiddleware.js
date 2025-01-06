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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Adjust the import path based on your project structure
// Authentication middleware to verify JWT token
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''); // Extract the token from the header
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        // Verify the token using the secret key
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret'); // Adjust based on the payload of your JWT
        // Find the user in the database using the decoded ID
        const user = yield User_1.default.findById(decoded.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Attach the user ID to the request object for later use
        req.user = {
            id: user.id.toString(), // Convert Mongoose ObjectId to string
        };
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('JWT verification failed:', error); // Log error for debugging
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
});
exports.authenticate = authenticate;
