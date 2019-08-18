import { login, logout } from './auth';
import {
    createUser,
    deleteUser,
    deleteUserAll,
    me,
    updateUser,
    user,
    users,
    UserTypeResolvers,
    verifyEmail
} from './user';
import { version } from './version';

const rootQuery = {
    login,
    logout,
    version,
    user,
    users,
    me,
    verifyEmail
};

const rootMutation = {
    createUser,
    deleteUser,
    deleteUserAll,
    updateUser
};

export default {
    Query: rootQuery,
    Mutation: rootMutation,
    User: UserTypeResolvers
};
