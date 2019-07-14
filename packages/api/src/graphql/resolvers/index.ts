import { login, logout } from './auth';
import { createUser, deleteUser, me, updateUser, user, users, UserTypeResolvers } from './user';
import { version } from './version';

const rootQuery = {
    login,
    logout,
    version,
    user,
    users,
    me
};

const rootMutation = {
    createUser,
    deleteUser,
    updateUser
};

export default {
    Query: rootQuery,
    Mutation: rootMutation,
    User: UserTypeResolvers
};
