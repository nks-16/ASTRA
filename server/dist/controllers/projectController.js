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
exports.getUserProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// Create project function
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, type, location, expectedROI, co2Reduction, renewableEnergy, jobCreation, transparency, wasteManagement, genderDiversityRate, accountability } = req.body;
        const newProject = new Project_1.default({
            title,
            type,
            location,
            expectedROI,
            co2Reduction,
            renewableEnergy,
            jobCreation,
            transparency,
            wasteManagement,
            genderDiversityRate,
            accountability,
        });
        yield newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createProject = createProject;
// Get user projects function
const getUserProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Assuming you have `user` object attached to `req`
        const projects = yield Project_1.default.find({ userId });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getUserProjects = getUserProjects;
