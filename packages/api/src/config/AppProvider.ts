import Express, { Application } from 'express';
import DatabaseManager from './DatabaseManager';
import MiddlewareConfig from './MiddlewareConfig';
import RouterConfig from './RouterConfig';

class AppProvider {
    public static getInstance(): Application {
        this.configureApp();
        return AppProvider.app;
    }

    private static app: Application = Express();

    private static configureApp(): void {
        DatabaseManager.connect();
        MiddlewareConfig.configMiddleware(this.app);
        RouterConfig.configRoutes(this.app);
    }
}

export default AppProvider;
