import { Document, Schema, model } from 'mongoose';

export interface ISample extends Document {
  test: string;
}

export const SampleSchema = new Schema({
  test: { type: String, required: true },
});

const Sample = model<ISample>('Sample', SampleSchema);

export default Sample;
