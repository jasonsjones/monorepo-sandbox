import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';

const JWT_SECRET = 'supersecretphrasetomovetoenvfile';

export const generateToken = (user: User): string => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: 60 * 60 /* 1hr (3600s) */ }
    );

    return token;
};

export const verifyToken = (token: string): string | object => {
    return jwt.verify(token, JWT_SECRET);
};
