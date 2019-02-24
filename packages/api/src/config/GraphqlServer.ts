import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/typedefs';

export class GraphqlServerProvider {
    public static getInstance = (): ApolloServer => {
        return GraphqlServerProvider.server;
    };

    private static server: ApolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
}
