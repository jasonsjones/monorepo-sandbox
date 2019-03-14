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

    public static getUserByEmail = (email: string): Promise<UserModelType> => {
        return User.findOne({ email }).exec();
    };

    public static deleteUser = (id: string): Promise<UserModelType> => {
        return User.findByIdAndRemove(id).exec();
    };
}

export default UserRepository;
