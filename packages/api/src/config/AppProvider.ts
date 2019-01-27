import * as express from 'express';

import RouterConfig from './RouterConfig';

class AppProvider {
    public static getInstance(): express.Application {
        this.configureRoutes();
        return AppProvider.app;
    }

    private static app: express.Application = express();

    private static configureRoutes(): void {
        RouterConfig.configRoutes(this.app);
    }
}

export default AppProvider;
