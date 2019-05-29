import * as UserRepository from '../../user/userRepository';

export const user = (_: any, args: any) => UserRepository.getUserById(args.id);
export const users = (_: any, __: any, context: any) => {
    if (context.req.user) {
        return UserRepository.getUsers();
    }

    if (context.req.authError) {
        return new Error(context.req.authError);
    }

    return null;
};

export const createUser = (parent: any, args: any) => {
    const newUser = {
        name: {
            first: args.firstName,
            last: args.lastName
        },
        email: args.email,
        password: args.password
    };
    return UserRepository.createUser(newUser);
};

export const deleteUser = (parent: any, args: any) => {
    return UserRepository.deleteUser(args.id);
};

export const me = (_: any, __: any, context: any) => {
    if (context.req.user) {
        return UserRepository.getUserById(context.req.user.id);
    }
    return null;
};

export const updateUser = (_: any, args: any, context: any) => {
    if (context.req.user.id === args.id) {
        const updatedData = JSON.parse(JSON.stringify(args.newUserData));
        return UserRepository.updateUser(args.id, updatedData);
    }
    return null;
};

export const UserTypeResolvers = {
    createdAt: (parent: any) => new Date(parent.createdAt).toISOString(),
    updatedAt: (parent: any) => new Date(parent.updatedAt).toISOString()
};
