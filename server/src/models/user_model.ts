import mongoose from 'mongoose';

// Define user roles as an enum for clarity
export enum UserRole {
  INVESTOR = 'investor',
  PROPOSER = 'proposer'
}

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [UserRole.INVESTOR, UserRole.PROPOSER], required: true },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
