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
exports.submitSolution = void 0;
const Team_1 = __importDefault(require("../models/Team"));
const submitSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { submissionLink } = req.body;
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const teamId = req.user.teamId;
        console.log(req.user);
        const team = yield Team_1.default.findById(teamId);
        console.log(team);
        if (!team) {
            throw new Error("Team not found");
        }
        if (!team || !team.qualifiedForRound2) {
            res.status(403).json({ message: 'Team is not qualified for submission' });
            return;
        }
        team.submissionLink = submissionLink;
        console.log(team);
        yield team.save();
        res.status(200).json({ message: 'Submission successful' });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.error(error);
    }
});
exports.submitSolution = submitSolution;
