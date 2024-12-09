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
exports.getUserTeamDetails = exports.joinTeam = exports.createTeam = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const ObjectId = mongoose_1.default.Types.ObjectId;
// Create a new team
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamName } = req.body;
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = new ObjectId(req.user.id);
        const existingTeam = yield Team_1.default.findOne({ name: teamName });
        if (existingTeam) {
            res.status(400).json({ message: 'Team name already exists' });
            return;
        }
        const team = new Team_1.default({ name: teamName, leaderId: userId, memberIds: [userId] });
        yield team.save();
        yield User_1.default.findByIdAndUpdate(userId, { teamId: team._id });
        res.status(201).json({ team });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createTeam = createTeam;
// Join an existing team
const joinTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamId = new ObjectId(req.params.teamId);
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userId = new ObjectId(req.user.id);
        const team = yield Team_1.default.findById(teamId);
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        if (team.memberIds.includes(userId)) {
            res.status(400).json({ message: 'You are already a member of this team' });
            return;
        }
        team.memberIds.push(userId);
        yield team.save();
        yield User_1.default.findByIdAndUpdate(userId, { teamId });
        res.status(200).json({ team });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.joinTeam = joinTeam;
// Get the user's team details (to display in the dashboard)
const getUserTeamDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.teamId) {
            res.status(401).json({ message: 'Unauthorized or No Team Information' });
            return;
        }
        const teamId = req.user.teamId; // Get teamId from the authenticated user's details
        // Find the team based on the teamId
        const team = yield Team_1.default.findById(teamId).populate('members'); // Assuming members are referenced in your Team model
        if (!team) {
            res.status(404).json({ message: 'No team found for this user' });
            return;
        }
        // Return the team details
        res.status(200).json(team);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
});
exports.getUserTeamDetails = getUserTeamDetails;
