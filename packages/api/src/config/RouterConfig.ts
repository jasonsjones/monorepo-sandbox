import { Application } from 'express';

import IndexRouter from '../index/IndexRouter';

class RouterConfig {
    public static configRoutes(app: Application): void {
        app.use('/', IndexRouter.getInstance());
    }
}

export default RouterConfig;
