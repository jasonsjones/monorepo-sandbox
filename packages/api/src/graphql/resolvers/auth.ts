import { compareSync } from 'bcrypt-nodejs';
import { generateToken } from '../../auth/authUtils';
import * as UserRepository from '../../user/userRepository';

export const login = (parent: any, args: any) => {
    return UserRepository.getUserByEmail(args.email).then(user => {
        const isAuth = compareSync(args.password, user.password);
        if (isAuth) {
            return {
                authUser: user,
                token: generateToken(user)
            };
        } else {
            return null;
        }
    });
};
