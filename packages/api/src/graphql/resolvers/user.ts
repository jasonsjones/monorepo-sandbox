import Mailer from '../../mailer/mailer';
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

export const createUser = async (parent: any, args: any, context: any) => {
    const newUserData = {
        name: {
            first: args.firstName,
            last: args.lastName
        },
        email: args.email,
        password: args.password
    };
    const newUser = await UserRepository.createUser(newUserData);
    await Mailer.sendVerificatonEmail(newUser);
    return newUser;
};

export const deleteUser = (parent: any, args: any) => {
    return UserRepository.deleteUser(args.id);
};

export const deleteUserAll = () => {
    return UserRepository.deleteUserAll();
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

export const verifyEmail = (_: any, args: any) => {
    const emailVerificationToken = args.token;
    return UserRepository.getUserByQuery({ emailVerificationToken }).then(fetchedUser => {
        if (fetchedUser && !fetchedUser.isEmailVerified) {
            return UserRepository.updateUser(fetchedUser._id, { isEmailVerified: true });
        } else if (fetchedUser && fetchedUser.isEmailVerified) {
            return fetchedUser;
        }
        return null;
    });
};

export const resendEmailVerification = async (_: any, __: any, context: any) => {
    if (context.req.user) {
        const usr = await UserRepository.getUserById(context.req.user.id);
        await Mailer.sendVerificatonEmail(usr);
        return true;
    }
    return false;
};

export const UserTypeResolvers = {
    isEmailVerified: (parent: any) => parent.isEmailVerified,
    emailVerificationToken: (parent: any) => parent.emailVerificationToken,
    createdAt: (parent: any) => new Date(parent.createdAt).toISOString(),
    updatedAt: (parent: any) => new Date(parent.updatedAt).toISOString()
};
