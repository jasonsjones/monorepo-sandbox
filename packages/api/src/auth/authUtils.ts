import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUserModel } from '../types';

export const generateToken = (user: IUserModel): string => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        config.jwtSecret,
        { expiresIn: 60 * 60 /* 1hr (3600s) */ }
    );

    return token;
};

export const verifyToken = (token: string): string | object => {
    return jwt.verify(token, config.jwtSecret);
};

export const generateRandomToken = (): string => {
    return crypto.randomBytes(20).toString('hex');
};
