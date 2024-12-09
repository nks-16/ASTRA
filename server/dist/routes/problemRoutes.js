"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/problemRoutes.ts
const express_1 = __importDefault(require("express"));
const problemController_1 = require("../controllers/problemController");
const router = express_1.default.Router();
// GET /api/problems - Get all problem statements
router.get("/", problemController_1.getAllProblems);
// GET /api/problems/:id - Get a problem statement by ID
router.get("/:id", problemController_1.getProblemById);
// POST /api/problems - Add a new problem statement
router.post("/", problemController_1.addProblem);
// PUT /api/problems/:id - Update a problem statement by ID
router.put("/:id", problemController_1.updateProblem);
// DELETE /api/problems/:id - Delete a problem statement by ID
router.delete("/:id", problemController_1.deleteProblem);
exports.default = router;
