import { genSalt, hash } from 'bcrypt-nodejs';
import fs from 'fs';
import config from '../config/config';
import { IUser, UserModelType } from '../types';
import User from './User';

const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        genSalt(10, (error: any, salt: string) => {
            if (error) {
                throw error;
            }
            hash(password, salt, null, (err: any, hashPwd: string) => {
                if (err) {
                    throw err;
                }
                resolve(hashPwd);
            });
        });
    });
};

class UserStore {
    public static addUser = (user: IUser): Promise<UserModelType | null> => {
        return new Promise((resolve, reject) => {
            if (!UserStore.isUserInStore(user.email)) {
                const newUser = new User(user);
                hashPassword(user.password).then((hp: string) => {
                    newUser.password = hp;
                    UserStore.users.push(newUser);
                    if (config.env !== 'testing') {
                        return UserStore.persistUser(newUser, resolve);
                    } else {
                        return resolve(newUser);
                    }
                });
            } else {
                return resolve(null);
            }
        });
    };

    public static getUsers = (): Promise<UserModelType[]> => {
        if (UserStore.isEmpty()) {
            return UserStore.initData().then(() => UserStore.users);
        } else {
            return Promise.resolve(UserStore.users);
        }
    };

    public static getUserById = (id: string): Promise<UserModelType> => {
        const foundUser = UserStore.users.find(user => user._id.toString() === id);
        return foundUser ? Promise.resolve(foundUser) : Promise.resolve(null);
    };

    public static isEmpty = (): boolean => {
        return UserStore.users.length === 0;
    };

    public static clear = (): void => {
        UserStore.users = [];
    };

    public static initData = (): Promise<UserModelType[]> => {
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

    private static users: UserModelType[] = [];
    private static userDataFile = `${__dirname}/user-data.json`;

    private static isUserInStore = (email: string): boolean => {
        return UserStore.users.some(user => user.email === email);
    };

    private static seedUsers = (): Promise<UserModelType[]> => {
        return UserStore.addUser({
            name: { first: 'Oliver', last: 'Queen' },
            email: 'oliver@qc.com',
            password: 'test1234'
        })
            .then(() =>
                UserStore.addUser({
                    name: { first: 'Barry', last: 'Allen' },
                    email: 'barry@starlabs.com',
                    password: '1234test'
                })
            )
            .then(() => {
                return UserStore.users;
            });
    };

    private static persistUser = (
        user: UserModelType,
        resolve: (user: UserModelType) => void
    ): void => {
        fs.writeFile(UserStore.userDataFile, JSON.stringify({ users: UserStore.users }), () => {
            return resolve(user);
        });
    };
}

export default UserStore;
