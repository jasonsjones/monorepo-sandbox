import Express, { Application } from 'express';
import addRoutes from './addRoutes';
import applyMiddleware from './applyMiddleware';
import server from './graphqlServer';

const configureApp = (expressApp: Application): void => {
    applyMiddleware(expressApp);
    server.applyMiddleware({ app: expressApp });
    addRoutes(expressApp);
};

const app: Application = Express();
configureApp(app);

export default app;
