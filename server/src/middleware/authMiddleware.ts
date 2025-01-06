import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Adjust the import path based on your project structure

// Extend the Request interface to include a custom `user` property
interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Only include `id`
}

// Authentication middleware to verify JWT token
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from the header

  if (!token) {
     res.status(401).json({ message: 'No token provided' });
     return;
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret'
    ) as { id: string }; // Adjust based on the payload of your JWT

    // Find the user in the database using the decoded ID
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return ;
    }

    // Attach the user ID to the request object for later use
    req.user = {
      id: user.id.toString(), // Convert Mongoose ObjectId to string
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT verification failed:', error); // Log error for debugging
     res.status(401).json({ message: 'Invalid or expired token' });
     return;
  }
};
