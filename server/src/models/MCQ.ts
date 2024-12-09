import mongoose, { Schema, Document } from 'mongoose';

interface IMCQ extends Document {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

const MCQSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
});

export default mongoose.model<IMCQ>('MCQ', MCQSchema);
