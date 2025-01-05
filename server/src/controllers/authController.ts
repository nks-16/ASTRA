import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';


export const signup = async (req: Request, res: Response)  =>  {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: 'team_member' });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response)  => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found"); // Or return a response for user not found.
    }
    if (!user){
       res.status(404).json({ message: 'User not found' });
       return; 
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
       res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ id: user._id, teamId: user.teamId }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    console.log(jwt.decode(token)); 
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error(error);
  }
};
