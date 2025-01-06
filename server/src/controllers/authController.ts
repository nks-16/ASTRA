import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Signup function to register a new user
export const signup = async (req: Request, res: Response) => {
  const { username,email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return ;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new user to the database
    await newUser.save();

     res.status(201).json({ message: 'User registered successfully' });
     return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    return ;
  }
};

// Login function to authenticate the user and generate JWT
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return ;
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return ;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
    return ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};
