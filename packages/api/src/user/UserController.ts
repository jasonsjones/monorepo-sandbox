import { Document } from 'mongoose';
import { IUser } from '../types';
import UserStore from './UserStore';

type UserType = IUser & Document;

class UserController {
    public static createUser = (user: IUser): Promise<UserType> => {
        return UserStore.addUser(user);
    };

    public static getUsers = (): Promise<UserType[]> => {
        return UserStore.getUsers();
    };

    public static getUser = (id: string): Promise<UserType> => {
        return UserStore.getUserById(id);
    };
}

export default UserController;
