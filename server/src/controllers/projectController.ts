import { Request, Response } from 'express'; // Import types from express
import Project from '../models/Project';

// Create project function
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, type, location, expectedROI, co2Reduction, renewableEnergy, jobCreation, transparency, wasteManagement, genderDiversityRate, accountability } = req.body;

    const newProject = new Project({
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

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user projects function
export const getUserProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId; // Assuming you have `user` object attached to `req`
    const projects = await Project.find({ userId });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
