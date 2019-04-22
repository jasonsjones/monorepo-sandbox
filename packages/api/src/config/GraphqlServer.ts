import { ApolloServer } from 'apollo-server-express';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';
import { IAuthRequest } from '../types';

export class GraphqlServerProvider {
    public static getInstance = (): ApolloServer => {
        return GraphqlServerProvider.server;
    };

    private static server: ApolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }: { req: IAuthRequest }) => ({
            user: req.user
        })
    });
}
