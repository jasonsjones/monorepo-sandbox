import { IUser, UserModelType } from '../types';
import User from './User';

class UserRepository {
    public static createUser = (user: IUser): Promise<UserModelType | null> => {
        const newUser = new User(user);
        return newUser.save();
    };

    public static getUsers = (): Promise<UserModelType[]> => {
        return User.find({}).exec();
    };

    public static getUserById = (id: string): Promise<UserModelType> => {
        return User.findById(id).exec();
    };
}

export default UserRepository;
