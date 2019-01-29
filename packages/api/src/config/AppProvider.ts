import Express from 'express';

import RouterConfig from './RouterConfig';

class AppProvider {
    public static getInstance(): Express.Application {
        this.configureRoutes();
        return AppProvider.app;
    }

    private static app: Express.Application = Express();

    private static configureRoutes(): void {
        RouterConfig.configRoutes(this.app);
    }
}

export default AppProvider;
