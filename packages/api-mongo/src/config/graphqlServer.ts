import { ApolloServer } from 'apollo-server-express';
import { Response } from 'express';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';
import { IAuthRequest } from '../types';

const gqlServer: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: { req: IAuthRequest; res: Response }) => ({ req, res })
});

export default gqlServer;
