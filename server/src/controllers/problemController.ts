// src/controllers/problemController.ts
import { Request, Response } from "express";
import ProblemStatement from "../models/ProblemStatement";

// Get all problem statements
export const getAllProblems = async (req: Request, res: Response): Promise<void> => {
  try {
    const problems = await ProblemStatement.find();
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Get problem statement by ID
export const getProblemById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const problem = await ProblemStatement.findById(id);
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return ;
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Add a new problem statement
export const addProblem = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const newProblem = new ProblemStatement({ title, description });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(500).json({ message: "Error adding problem", error: err });
  }
};

// Update a problem statement by ID
export const updateProblem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedProblem = await ProblemStatement.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedProblem) {
      res.status(404).json({ message: "Problem not found" });
      return ;
    }
    res.status(200).json(updatedProblem);
  } catch (err) {
    res.status(500).json({ message: "Error updating problem", error: err });
  }
};

// Delete a problem statement by ID
export const deleteProblem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedProblem = await ProblemStatement.findByIdAndDelete(id);
    if (!deletedProblem) {
      res.status(404).json({ message: "Problem not found" });
      return ;
    }
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting problem", error: err });
  }
};
