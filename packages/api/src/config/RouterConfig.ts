import { Application } from 'express';

import IndexRouter from '../index/IndexRouter';
import UserRouter from '../user/UserRouter';

class RouterConfig {
    public static configRoutes(app: Application): void {
        app.use('/api', IndexRouter.getInstance());
        app.use('/api/users', UserRouter.getInstance());
    }
}

export default RouterConfig;
