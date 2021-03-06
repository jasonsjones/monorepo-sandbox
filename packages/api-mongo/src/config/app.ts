import Express, { Application } from 'express';
import addRoutes from './addRoutes';
import applyMiddleware from './applyMiddleware';
import server from './graphqlServer';

const configureApp = (expressApp: Application): void => {
    applyMiddleware(expressApp);
    addRoutes(expressApp);
    server.applyMiddleware({
        app: expressApp,
        cors: {
            origin: ['http://localhost:4200', 'http://localhost:4201'],
            credentials: true
        }
    });
};

const app: Application = Express();
configureApp(app);

export default app;
