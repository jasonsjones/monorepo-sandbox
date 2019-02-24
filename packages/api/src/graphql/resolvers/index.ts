import helloResolver from './hello';

export default {
    Query: {
        ...helloResolver
    }
};
