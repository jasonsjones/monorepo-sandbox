import { compareSync } from 'bcrypt-nodejs';
import AuthUtils from '../../auth/AuthUtils';
import UserRepository from '../../user/UserRepository';

export const login = (parent: any, args: any) => {
    return UserRepository.getUserByEmail(args.email).then(user => {
        const isAuth = compareSync(args.password, user.password);
        if (isAuth) {
            return {
                authUser: user,
                token: AuthUtils.generateToken(user)
            };
        } else {
            return null;
        }
    });
};
