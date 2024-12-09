import mongoose, { Schema, Document } from 'mongoose';

interface IProblemStatement extends Document {
  title: string;
  description: string;
}

const ProblemStatementSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IProblemStatement>('ProblemStatement', ProblemStatementSchema);
