import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  title: string;
  type: string;
  location: string;
  expectedROI: number;
  co2Reduction: number;
  renewableEnergy: boolean;
  jobCreation: number;
  transparency: boolean;
  wasteManagement: number;
  genderDiversityRate: number;
  accountability: boolean;
  status: string; // 'pending', 'accepted', 'rejected'
  approver: string | null;
  budget: number; // The total budget for the project
  envScore: number; // Environmental score (e.g., based on ESG metrics)
  socialScore: number; // Social score (e.g., based on social impact)
  governanceScore: number; // Governance score (e.g., based on corporate governance)
  overallESGScore: number; // Overall ESG score (calculated from the other scores)
}

const projectSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  expectedROI: { type: Number, required: true },
  co2Reduction: { type: Number, required: true },
  renewableEnergy: { type: Boolean, required: true },
  jobCreation: { type: Number, required: true },
  transparency: { type: Boolean, required: true },
  wasteManagement: { type: Number, required: true },
  genderDiversityRate: { type: Number, required: true },
  accountability: { type: Boolean, required: true },
  status: { type: String, default: 'pending' },
  approver: { type: String, default: null },
  budget: { type: Number, required: true }, // New field
  envScore: { type: Number, required: true }, // Environmental score
  socialScore: { type: Number, required: true }, // Social score
  governanceScore: { type: Number, required: true }, // Governance score
  overallESGScore: { type: Number, required: true }, // Overall ESG score
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
