import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
