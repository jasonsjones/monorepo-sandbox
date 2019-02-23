import { Document } from 'mongoose';

export type UserModelType = IUser & Document;

export interface IUser {
    email: string;
    password: string;
}

interface IPayload {
    version?: string;
    user?: UserModelType;
    users?: UserModelType[];
}

export interface IJSONResponse {
    success: boolean;
    message: string;
    payload: IPayload | null;
}
