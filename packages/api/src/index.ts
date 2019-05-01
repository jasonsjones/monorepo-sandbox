import { ApolloServer } from 'apollo-server-express';
import debug from 'debug';

import app from './config/app';
import DatabaseManager from './config/DatabaseManager';
import { GraphqlServerProvider } from './config/GraphqlServer';

const log = debug('app');
const PORT = process.env.PORT || 3000;

const startServer = (gqlServer: ApolloServer): void => {
    DatabaseManager.connect();
    app.listen(PORT, () => {
        log(`App is running on http://localhost:${PORT}/api`);
        log(`Graphql server is running on http://localhost:${PORT}${gqlServer.graphqlPath}`);
    });
};

startServer(GraphqlServerProvider.getInstance());
