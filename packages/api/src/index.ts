import { ApolloServer } from 'apollo-server-express';
import debug from 'debug';
import AppProvider from './config/AppProvider';
import { GraphqlServerProvider } from './config/GraphqlServer';

const log = debug('app');

const PORT = process.env.PORT || 3000;

const startServer = async (gqlServer: ApolloServer) => {
    const app = await AppProvider.getInstance();
    app.listen(PORT, () => {
        log(`App is running on http://localhost:${PORT}/api`);
        log(`Graphql server is running on http://localhost:${PORT}${gqlServer.graphqlPath}`);
    });
};

startServer(GraphqlServerProvider.getInstance());
