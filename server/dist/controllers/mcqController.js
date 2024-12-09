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
exports.addMCQ = exports.submitMCQAnswers = exports.getMCQs = void 0;
const MCQ_1 = __importDefault(require("../models/MCQ"));
const Team_1 = __importDefault(require("../models/Team"));
const getMCQs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mcqs = yield MCQ_1.default.find();
        res.status(200).json(mcqs);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getMCQs = getMCQs;
const submitMCQAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answers } = req.body;
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const teamId = req.user.teamId;
        const mcqs = yield MCQ_1.default.find();
        let score = 0;
        answers.forEach((answer, index) => {
            if (mcqs[index].correctOptionIndex === answer) {
                score += 1;
            }
        });
        const team = yield Team_1.default.findById(teamId);
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        team.round1Score = score;
        team.qualifiedForRound2 = score >= 5; // Replace `5` with your threshold
        yield team.save();
        res.status(200).json({ score, qualified: team.qualifiedForRound2 });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.submitMCQAnswers = submitMCQAnswers;
const addMCQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, options, correctOptionIndex } = req.body;
        // Create a new MCQ question document
        const newMCQ = new MCQ_1.default({
            question,
            options,
            correctOptionIndex,
        });
        // Save the new question to the database
        yield newMCQ.save();
        // Send success response
        res.status(201).json({
            message: 'MCQ question added successfully',
            mcq: newMCQ,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to add MCQ question',
            error: error,
        });
    }
});
exports.addMCQ = addMCQ;
