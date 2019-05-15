import bodyParser from 'body-parser';
import { Application, NextFunction, Response } from 'express';
import morgan from 'morgan';
import { verifyToken } from '../auth/authUtils';
import { IAuthRequest } from '../types';

import config from './config';

const addUserToRequest = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            try {
                const decoded: any = verifyToken(token);
                if (decoded) {
                    req.user = {
                        id: decoded.id,
                        email: decoded.email
                    };
                }
            } catch (err) {
                req.user = null;
                req.authError = err;
            }
        } else {
            req.user = null;
        }
    }
    next();
};

const applyMiddleware = (app: Application): void => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(addUserToRequest);

    if (config.env === 'development') {
        app.use(morgan('dev'));
    }
};

export default applyMiddleware;
