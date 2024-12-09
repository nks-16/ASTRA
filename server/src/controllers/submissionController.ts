import { Request, Response } from 'express';
import Team from '../models/Team';

export const submitSolution = async (req: Request, res: Response) => {
  try {
    const { submissionLink } = req.body;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return ;
    }
    const teamId = req.user.teamId;
    console.log(req.user);
    const team = await Team.findById(teamId);
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
    await team.save();

    res.status(200).json({ message: 'Submission successful' });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error(error);
  }
};
