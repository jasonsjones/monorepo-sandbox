import { ApolloServer } from 'apollo-server-express';
import { Response } from 'express';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';
import { IAuthRequest } from '../types';

interface ContextValue {
    req: IAuthRequest;
    res: Response;
}

const gqlServer: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: ContextValue): ContextValue => ({ req, res })
});

export default gqlServer;
