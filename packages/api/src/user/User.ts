import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../types';

type UserType = IUser & Document;

const userSchema = new Schema({
    email: String,
    password: String
});

const User = mongoose.model<UserType>('User', userSchema);

export default User;
