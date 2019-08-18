import { Request, Response } from 'express';
import { getUserByQuery, updateUser } from './userRepository';

export const verifyemail = (req: Request, res: Response): void => {
    const emailVerificationToken = req.params.token;
    getUserByQuery({ emailVerificationToken })
        .then(user => {
            if (user && !user.isEmailVerified) {
                return updateUser(user._id, { isEmailVerified: true });
            }
            return user;
        })
        .then(user => {
            let json = {};

            if (user) {
                json = {
                    success: true,
                    message: 'email verified',
                    payload: { user }
                };
            } else {
                json = {
                    success: false,
                    message: 'email not verified; user not found',
                    payload: { user }
                };
            }
            res.json(json);
        });
};
