import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'team_leader' | 'team_member';
  teamId?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['team_leader', 'team_member'], required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});

export default mongoose.model<IUser>('User', UserSchema);
