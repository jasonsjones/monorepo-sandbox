import { compareSync } from 'bcrypt-nodejs';
import { generateToken } from '../../auth/authUtils';
import * as UserRepository from '../../user/userRepository';

export const login = (parent: any, args: any, { res }: any) => {
    return UserRepository.getUserByEmail(args.email).then(user => {
        const isAuth = compareSync(args.password, user.password);
        if (isAuth) {
            const token = generateToken(user);
            res.cookie('access-token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 /* 1hr */ });
            return {
                authUser: user,
                token
            };
        } else {
            return null;
        }
    });
};

export const logout = (parent: any, args: any, { req, res }: any) => {
    req.user = null;
    res.clearCookie('access-token');
    return true;
};
