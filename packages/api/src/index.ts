import { ApolloServer } from 'apollo-server-express';
import debug from 'debug';
import app from './config/app';
import { dbConnect } from './config/db';
import gqlServer from './config/graphqlServer';

const log = debug('app');
const PORT = process.env.PORT || 3000;

const startServer = (server: ApolloServer): void => {
    dbConnect();
    app.listen(PORT, () => {
        log(`App is running on http://localhost:${PORT}/api`);
        log(`Graphql server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer(gqlServer);
