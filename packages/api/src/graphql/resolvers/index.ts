import { hello } from './hello';
import { createUser, user, users } from './user';

const rootQuery = {
    hello,
    user,
    users
};

const rootMutation = {
    createUser
};

export default {
    Query: rootQuery,
    Mutation: rootMutation
};
