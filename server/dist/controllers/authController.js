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
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// Signup function to register a new user
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        // Create a new user instance
        const newUser = new User_1.default({
            username,
            email,
            password: hashedPassword,
            role,
        });
        // Save the new user to the database
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});
exports.signup = signup;
// Login function to authenticate the user and generate JWT
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Compare the password with the hashed password
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});
exports.login = login;
