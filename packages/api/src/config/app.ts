import Express, { Application } from 'express';

import applyMiddleware from './applyMiddleware';
import { GraphqlServerProvider } from './GraphqlServer';
import RouterConfig from './RouterConfig';

const configureApp = (expressApp: Application): void => {
    applyMiddleware(expressApp);
    GraphqlServerProvider.getInstance().applyMiddleware({ app: expressApp });
    RouterConfig.configRoutes(expressApp);
};

const app: Application = Express();
configureApp(app);

export default app;
