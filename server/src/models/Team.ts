import mongoose, { Schema, Document } from 'mongoose';

interface ITeam extends Document {
  name: string;
  leaderId: mongoose.Types.ObjectId;
  memberIds: mongoose.Types.ObjectId[];
  round1Score?: number;
  qualifiedForRound2?: boolean;
  submissionLink?: string;
  problemStatementId?: mongoose.Types.ObjectId;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  round1Score: { type: Number, default: 0 },
  qualifiedForRound2: { type: Boolean, default: false },
  submissionLink: { type: String },
  problemStatementId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProblemStatement' },
});

export default mongoose.model<ITeam>('Team', TeamSchema);
