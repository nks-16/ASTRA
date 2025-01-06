import mongoose, { Schema, Document } from 'mongoose';

interface IInvestor extends Document {
  name: string;
  email: string;
}

const investorSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Investor = mongoose.model<IInvestor>('Investor', investorSchema);

export default Investor;
