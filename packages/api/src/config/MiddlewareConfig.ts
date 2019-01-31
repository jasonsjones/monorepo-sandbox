import { Application } from 'express';
import morgan from 'morgan';

import config from './config';

class MiddlewareConfig {
    public static configMiddleware(app: Application) {
        if (config.env === 'development') {
            app.use(morgan('dev'));
        }
    }
}

export default MiddlewareConfig;
