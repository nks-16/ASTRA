import { Request, Response } from 'express';
import MCQ from '../models/MCQ';
import Team from '../models/Team';

export const getMCQs = async (req: Request, res: Response) => {
  try {
    const mcqs = await MCQ.find();
    res.status(200).json(mcqs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const submitMCQAnswers = async (req: Request, res: Response) => {
  try {
    const { answers } = req.body;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const teamId = req.user.teamId;

    const mcqs = await MCQ.find();
    let score = 0;

    answers.forEach((answer: number, index: number) => {
      if (mcqs[index].correctOptionIndex === answer) {
        score += 1;
      }
    });

    const team = await Team.findById(teamId);
    if (!team) 
      {
        res.status(404).json({ message: 'Team not found' });
        return;
      }
    team.round1Score = score;
    team.qualifiedForRound2 = score >= 5; // Replace `5` with your threshold
    await team.save();

    res.status(200).json({ score, qualified: team.qualifiedForRound2 });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const addMCQ = async (req: Request, res: Response) => {
  try {
    const { question, options, correctOptionIndex } = req.body;

    // Create a new MCQ question document
    const newMCQ = new MCQ({
      question,
      options,
      correctOptionIndex,
    });

    // Save the new question to the database
    await newMCQ.save();

    // Send success response
    res.status(201).json({
      message: 'MCQ question added successfully',
      mcq: newMCQ,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add MCQ question',
      error: error,
    });
  }
};