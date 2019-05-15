import { ApolloServer } from 'apollo-server-express';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';
import { IAuthRequest } from '../types';

const gqlServer: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: IAuthRequest }) => ({ req })
});

export default gqlServer;
