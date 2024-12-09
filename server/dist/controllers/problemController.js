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
exports.deleteProblem = exports.updateProblem = exports.addProblem = exports.getProblemById = exports.getAllProblems = void 0;
const ProblemStatement_1 = __importDefault(require("../models/ProblemStatement"));
// Get all problem statements
const getAllProblems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield ProblemStatement_1.default.find();
        res.status(200).json(problems);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});
exports.getAllProblems = getAllProblems;
// Get problem statement by ID
const getProblemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const problem = yield ProblemStatement_1.default.findById(id);
        if (!problem) {
            res.status(404).json({ message: "Problem not found" });
            return;
        }
        res.status(200).json(problem);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});
exports.getProblemById = getProblemById;
// Add a new problem statement
const addProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const newProblem = new ProblemStatement_1.default({ title, description });
        yield newProblem.save();
        res.status(201).json(newProblem);
    }
    catch (err) {
        res.status(500).json({ message: "Error adding problem", error: err });
    }
});
exports.addProblem = addProblem;
// Update a problem statement by ID
const updateProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedProblem = yield ProblemStatement_1.default.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedProblem) {
            res.status(404).json({ message: "Problem not found" });
            return;
        }
        res.status(200).json(updatedProblem);
    }
    catch (err) {
        res.status(500).json({ message: "Error updating problem", error: err });
    }
});
exports.updateProblem = updateProblem;
// Delete a problem statement by ID
const deleteProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProblem = yield ProblemStatement_1.default.findByIdAndDelete(id);
        if (!deletedProblem) {
            res.status(404).json({ message: "Problem not found" });
            return;
        }
        res.status(200).json({ message: "Problem deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting problem", error: err });
    }
});
exports.deleteProblem = deleteProblem;
