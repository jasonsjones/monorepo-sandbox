import { login, logout } from './auth';
import {
    createUser,
    deleteUser,
    deleteUserAll,
    me,
    requestPasswordReset,
    resendEmailVerification,
    updateUser,
    user,
    users,
    UserTypeResolvers,
    verifyEmail
} from './user';
import { version } from './version';

const query = {
    version,
    user,
    users,
    me,
    resendEmailVerification,
    requestPasswordReset,
    verifyEmail
};

const rootMutation = {
    createUser,
    deleteUser,
    deleteUserAll,
    updateUser
};

const auth = {
    login,
    logout
};

const rootQuery = {
    ...query,
    ...auth
};

export default {
    Query: rootQuery,
    Mutation: rootMutation,
    User: UserTypeResolvers
};
