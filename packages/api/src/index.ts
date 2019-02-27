import debug from 'debug';
import AppProvider from './config/AppProvider';
import { GraphqlServerProvider } from './config/GraphqlServer';

const log = debug('app');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    const app = await AppProvider.getInstance();
    const server = GraphqlServerProvider.getInstance();

    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        log(`App is running on http://localhost:${PORT}/api`);
        log(`Graphql server is running at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();
