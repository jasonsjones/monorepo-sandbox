import fs from 'fs';
import { Document } from 'mongoose';
import config from '../config/config';
import { IUser } from '../types';
import User from './User';

type UserType = IUser & Document;

class UserStore {
    public static addUser = (user: IUser): Promise<UserType | null> => {
        return new Promise((resolve, reject) => {
            if (!UserStore.isUserInStore(user.email)) {
                const newUser = new User(user);
                UserStore.users.push(new User(newUser));
                if (config.env !== 'testing') {
                    return UserStore.persistUser(newUser, resolve);
                } else {
                    return resolve(newUser);
                }
            } else {
                return resolve(null);
            }
        });
    };

    public static getUsers = (): Promise<UserType[]> => {
        if (UserStore.isEmpty()) {
            return UserStore.initData().then(() => UserStore.users);
        } else {
            return Promise.resolve(UserStore.users);
        }
    };

    public static getUserById = (id: string): Promise<UserType> => {
        const foundUser = UserStore.users.find(user => user.id === id);
        return foundUser ? Promise.resolve(foundUser) : Promise.resolve(null);
    };

    public static isEmpty = (): boolean => {
        return UserStore.users.length === 0;
    };

    public static clear = (): void => {
        UserStore.users = [];
    };

    public static initData = (): Promise<UserType[]> => {
        return new Promise((resolve, reject) => {
            fs.exists(UserStore.userDataFile, exists => {
                if (exists) {
                    fs.readFile(UserStore.userDataFile, 'utf8', (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        const json = JSON.parse(data);
                        UserStore.users = json.users;
                        return resolve(UserStore.users);
                    });
                } else {
                    UserStore.seedUsers().then(() => resolve(UserStore.users));
                }
            });
        });
    };

    private static users: UserType[] = [];
    private static userDataFile = `${__dirname}/user-data.json`;

    private static isUserInStore = (email: string): boolean => {
        return UserStore.users.some(user => user.email === email);
    };

    private static seedUsers = (): Promise<UserType[]> => {
        return UserStore.addUser({ email: 'oliver@qc.com', password: 'test1234' })
            .then(() => UserStore.addUser({ email: 'barry@starlabs.com', password: '1234test' }))
            .then(() => {
                return UserStore.users;
            });
    };

    private static persistUser = (user: UserType, resolve: (user: UserType) => void): void => {
        fs.writeFile(UserStore.userDataFile, JSON.stringify({ users: UserStore.users }), () => {
            return resolve(user);
        });
    };
}

export default UserStore;
