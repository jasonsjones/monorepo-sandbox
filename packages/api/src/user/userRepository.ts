import { IUser, IUserModel } from '../types';
import User from './userModel';

export const createUser = (user: IUser): Promise<IUserModel | null> => {
    const newUser = new User(user);
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

export const deleteUser = (id: string): Promise<IUserModel> => {
    return User.findByIdAndRemove(id).exec();
};

export const updateUser = (id: string, newUserData: any): Promise<IUserModel> => {
    if (newUserData._id) {
        delete newUserData._id;
    }
    return User.findByIdAndUpdate(id, newUserData, { new: true }).exec();
};

export const getModel = () => {
    return User;
};
