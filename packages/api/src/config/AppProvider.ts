import Express from 'express';

import MiddlewareConfig from './MiddlewareConfig';
import RouterConfig from './RouterConfig';

class AppProvider {
    public static getInstance(): Express.Application {
        this.configureApp();
        return AppProvider.app;
    }

    private static app: Express.Application = Express();

    private static configureApp(): void {
        MiddlewareConfig.configMiddleware(this.app);
        RouterConfig.configRoutes(this.app);
    }
}

export default AppProvider;
