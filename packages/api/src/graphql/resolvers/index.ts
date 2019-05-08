import { login } from './auth';
import { createUser, deleteUser, me, user, users, UserTypeResolvers } from './user';
import { version } from './version';

const rootQuery = {
    login,
    version,
    user,
    users,
    me
};

const rootMutation = {
    createUser,
    deleteUser
};

export default {
    Query: rootQuery,
    Mutation: rootMutation,
    User: UserTypeResolvers
};