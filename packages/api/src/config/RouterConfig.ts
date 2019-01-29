import Express from 'express';

import IndexRouter from '../index/IndexRouter';

class RouterConfig {
    public static configRoutes(app: Express.Application): void {
        app.use('/', IndexRouter.getInstance());
    }
}

export default RouterConfig;
