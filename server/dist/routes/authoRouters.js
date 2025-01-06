"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// POST /signup - Route to handle user signup
router.post('/signup', authController_1.signup);
// POST /login - Route to handle user login
router.post('/login', authController_1.login);
exports.default = router;
