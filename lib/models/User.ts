import { Schema, model, models } from 'mongoose';

interface IUser {
  clerkUserId: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

const userSchema = new Schema<IUser>({
  clerkUserId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
}, { timestamps: true });

export default models.User || model<IUser>('User', userSchema);