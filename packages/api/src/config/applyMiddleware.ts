import cookieParser from 'cookie-parser';
import express, { Application, NextFunction, Response } from 'express';
import morgan from 'morgan';
import { verifyToken } from '../auth/authUtils';
import { IAuthRequest } from '../types';

import config from './config';

const getTokens = (req: IAuthRequest) => {
    let bearerToken = null;
    if (req.headers.authorization) {
        bearerToken = req.headers.authorization.split(' ')[1];
    }

    const token = bearerToken || req.cookies['access-token'];
    const refreshToken = req.cookies['refresh-token'];

    return {
        token,
        refreshToken
    };
};

const addUserToRequest = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { token } = getTokens(req);
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
    next();
};

const applyMiddleware = (app: Application): void => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(addUserToRequest);

    if (config.env === 'development') {
        app.use(morgan('dev'));
    }
};

export default applyMiddleware;
