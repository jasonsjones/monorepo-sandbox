import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUserModel } from '../types';

export const generateToken = (user: IUserModel): string => {
    if (!user) {
        throw new Error('user is required to generate token');
    }
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
    if (!token) {
        throw new Error('token is required to verify');
    }
    return jwt.verify(token, config.jwtSecret);
};