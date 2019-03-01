import UserRepository from '../../user/UserRepository';

export const user = (parent: any, args: any) => UserRepository.getUserById(args.id);
export const users = () => UserRepository.getUsers();

export const createUser = (parent: any, args: any) => {
    const newUser = {
        email: args.email,
        password: args.password
    };
    return UserRepository.createUser(newUser);
};

export const deleteUser = (parent: any, args: any) => {
    return UserRepository.deleteUser(args.id);
};

export const UserTypeResolvers = {
    createdAt: (parent: any) => new Date(parent.createdAt).toISOString(),
    updatedAt: (parent: any) => new Date(parent.updatedAt).toISOString()
};
