import UserStore from '../../user/UserStore';

export const user = (parent: any, args: any) => UserStore.getUserById(args.id);
export const users = () => UserStore.getUsers();

export const createUser = (parent: any, args: any) => {
    const newUser = {
        email: args.email,
        password: args.password
    };
    return UserStore.addUser(newUser);
};
