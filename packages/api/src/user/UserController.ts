import { Document } from 'mongoose';
import { IUser } from '../types';
import UserStore from './UserStore';

type UserType = IUser & Document;

export const createUser = (user: IUser): Promise<UserType> => {
    return UserStore.addUser(user);
};

export const getUsers = (): Promise<UserType[]> => {
    return UserStore.getUsers();
};

export const getUser = (id: string): Promise<UserType> => {
    return UserStore.getUserById(id);
};
