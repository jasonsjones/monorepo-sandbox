import Express from 'express';
import morgan from 'morgan';

import config from './config';

class MiddlewareConfig {
    public static configMiddleware(app: Express.Application) {
        if (config.env === 'development') {
            app.use(morgan('dev'));
        }
    }
}

export default MiddlewareConfig;
