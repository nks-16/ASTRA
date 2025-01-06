"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/create', authMiddleware_1.authenticate, projectController_1.createProject); // Requires authentication
router.get('/user-projects', authMiddleware_1.authenticate, projectController_1.getUserProjects); // Requires authentication
exports.default = router;
