import bodyParser from 'body-parser';
import { Application, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';

import { IAuthRequest } from '../types';
import config from './config';

const addUserToRequest = (req: IAuthRequest, res: Response, next: NextFunction) => {
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
