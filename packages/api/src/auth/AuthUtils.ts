import jwt from 'jsonwebtoken';
import config from '../config/config';

import { UserModelType } from '../types';

class AuthUtils {
    public static generateToken = (user: UserModelType): string => {
        if (!user) {
            throw new Error('user is required to generate token');
        }
        const token = jwt.sign(
            {
                sub: user._id,
                email: user.email
            },
            config.jwtSecret,
            { expiresIn: '24hr' }
        );

        return token;
    };

    public static verifyToken = (token: string) => {
        if (!token) {
            throw new Error('token is required to verify');
        }
        return jwt.verify(token, config.jwtSecret);
    };
}

export default AuthUtils;
