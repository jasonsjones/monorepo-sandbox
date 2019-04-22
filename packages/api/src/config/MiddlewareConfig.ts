import bodyParser from 'body-parser';
import { Application, Response } from 'express';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import { IAuthRequest } from '../types';
import config from './config';

class MiddlewareConfig {
    public static configMiddleware(app: Application) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use((req: IAuthRequest, res: Response, next: any) => {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                if (token) {
                    const decoded: any = jwt.verify(token, config.jwtSecret);
                    req.user = {
                        id: decoded.sub,
                        email: decoded.email
                    };
                } else {
                    req.user = null;
                }
            }
            next();
        });

        if (config.env === 'development') {
            app.use(morgan('dev'));
        }
    }
}

export default MiddlewareConfig;
