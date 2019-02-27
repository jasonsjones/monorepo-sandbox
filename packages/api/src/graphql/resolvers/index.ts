import { hello } from './hello';
import { createUser, user, users } from './user';

const RootQuery = {
    Query: {
        hello,
        user,
        users
    }
};

const RootMutation = {
    Mutation: {
        createUser
    }
};

export default {
    RootQuery,
    RootMutation
};
