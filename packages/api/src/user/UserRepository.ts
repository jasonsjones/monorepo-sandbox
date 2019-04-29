import { IUser, IUserModel } from '../types';
import User from './User';

class UserRepository {
    public static createUser = (user: IUser): Promise<IUserModel | null> => {
        const newUser = new User(user);
        return newUser.save();
    };

    public static getUsers = (): Promise<IUserModel[]> => {
        return User.find({}).exec();
    };

    public static getUserById = (id: string): Promise<IUserModel> => {
        return User.findById(id).exec();
    };

    public static getUserByEmail = (email: string): Promise<IUserModel> => {
        return User.findOne({ email }).exec();
    };

    public static deleteUser = (id: string): Promise<IUserModel> => {
        return User.findByIdAndRemove(id).exec();
    };
}

export default UserRepository;
