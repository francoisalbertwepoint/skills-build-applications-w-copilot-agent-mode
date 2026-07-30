import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  type: string;
  duration: number;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>({
  title: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
