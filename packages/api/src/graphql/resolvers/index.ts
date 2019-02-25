import userResolver from './user';

export default {
    Query: {
        ...userResolver
    }
};
