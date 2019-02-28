import { hello } from './hello';
import { createUser, deleteUser, user, users } from './user';

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
    Mutation: rootMutation
};
