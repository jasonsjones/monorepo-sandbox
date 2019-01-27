import * as express from 'express';

import IndexRouter from '../index/IndexRouter';

class RouterConfig {
    public static configRoutes(app: express.Application): void {
        app.use('/', IndexRouter.getInstance());
    }
}

export default RouterConfig;
