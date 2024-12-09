// src/routes/problemRoutes.ts
import express from "express";
import {
  getAllProblems,
  getProblemById,
  addProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController";

const router = express.Router();

// GET /api/problems - Get all problem statements
router.get("/", getAllProblems);

// GET /api/problems/:id - Get a problem statement by ID
router.get("/:id", getProblemById);

// POST /api/problems - Add a new problem statement
router.post("/", addProblem);

// PUT /api/problems/:id - Update a problem statement by ID
router.put("/:id", updateProblem);

// DELETE /api/problems/:id - Delete a problem statement by ID
router.delete("/:id", deleteProblem);

export default router;
