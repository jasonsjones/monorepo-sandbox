import { Request } from 'express';
import { Document } from 'mongoose';

export type IUserModel = IUser & Document;

export interface IUser {
    name: {
        first: string;
        last: string;
    };
    email: string;
    password: string;
    isEmailVerified?: boolean;
    emailVerificationToken?: string;
}

interface IPayload {
    version?: string;
    user?: IUserModel;
    users?: IUserModel[];
}

export interface IJSONResponse {
    success: boolean;
    message: string;
    payload: IPayload | null;
}

export interface IAuthRequest extends Request {
    user?: any;
    authError?: any;
}
