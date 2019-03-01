import { hello } from './hello';
import { createUser, deleteUser, user, users, UserTypeResolvers } from './user';

const rootQuery = {
    hello,
    user,
    users
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
