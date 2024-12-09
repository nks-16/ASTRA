import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Team from '../models/Team';
import User from '../models/User';

const ObjectId = mongoose.Types.ObjectId;

// Create a new team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const { teamName } = req.body;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userId = new ObjectId(req.user.id);

    const existingTeam = await Team.findOne({ name: teamName });
    if (existingTeam) {
      res.status(400).json({ message: 'Team name already exists' });
      return;
    }

    const team = new Team({ name: teamName, leaderId: userId, memberIds: [userId] });
    await team.save();

    await User.findByIdAndUpdate(userId, { teamId: team._id });

    res.status(201).json({ team });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Join an existing team
export const joinTeam = async (req: Request, res: Response) => {
  try {
    const teamId = new ObjectId(req.params.teamId);
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userId = new ObjectId(req.user.id);

    const team = await Team.findById(teamId);

    if (!team) {
      res.status(404).json({ message: 'Team not found' });
      return;
    }
    if (team.memberIds.includes(userId)) {
      res.status(400).json({ message: 'You are already a member of this team' });
      return;
    }
    team.memberIds.push(userId);
    await team.save();

    await User.findByIdAndUpdate(userId, { teamId });

    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ message: error});
  }
};

// Get the user's team details (to display in the dashboard)

