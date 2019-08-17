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
        .then(() => {
            // TODO: update redirect url to point back to the app e.g. http://localhost:4200/someroute
            res.redirect('https://www.dev.to');
        });
};
