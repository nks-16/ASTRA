import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user_model';

interface JwtPayload {
  id: string;
  teamId:string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Authorization token is missing');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as unknown as JwtPayload;
    req.user = { id: decodedToken.id, teamId: decodedToken.teamId };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
