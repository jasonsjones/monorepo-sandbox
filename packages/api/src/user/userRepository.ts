import { generateRandomToken } from '../auth/authUtils';
import config from '../config/config';
import { IUser, IUserModel } from '../types';
import User from './userModel';

export const createUser = (user: IUser): Promise<IUserModel | null> => {
    const newUser = new User(user);
    newUser.emailVerificationToken = generateRandomToken();
    return newUser.save();
};

export const getUsers = (): Promise<IUserModel[]> => {
    return User.find({}).exec();
};

export const getUserById = (id: string): Promise<IUserModel> => {
    return User.findById(id).exec();
};

export const getUserByEmail = (email: string): Promise<IUserModel> => {
    return User.findOne({ email }).exec();
};

export const getUserByQuery = (query: any): Promise<IUserModel> => {
    return User.findOne(query).exec();
};

export const deleteUser = (id: string): Promise<IUserModel> => {
    return User.findByIdAndRemove(id).exec();
};

export const deleteUserAll = (): Promise<boolean> => {
    if (config.env === 'testing') {
        return User.deleteMany({})
            .exec()
            .then(() => true);
    }

    return Promise.resolve(false);
};

export const updateUser = (id: string, newUserData: any): Promise<IUserModel> => {
    if (newUserData._id) {
        delete newUserData._id;
    }
    return User.findByIdAndUpdate(id, newUserData, { new: true }).exec();
};

export const generatePasswordResetToken = (email: string): Promise<IUserModel> => {
    return getUserByEmail(email).then(usr => {
        const expiresIn2Hours = new Date();
        expiresIn2Hours.setHours(expiresIn2Hours.getHours() + 2);

        usr.passwordResetToken = generateRandomToken();
        usr.passwordResetTokenExpiresAt = expiresIn2Hours;
        return usr.save();
    });
};

export const getModel = () => {
    return User;
};
