import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';

export const createAccessToken = (user: User): string => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' }
    );
    return token;
};

export const createRefreshToken = (user: User): string => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '7d' }
    );
    return token;
};

export const verifyAccessToken = (token: string): string | object => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
};

export const verifyRefreshToken = (token: string): string | object => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
};
