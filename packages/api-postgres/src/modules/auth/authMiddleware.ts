import debug from 'debug';
import { MiddlewareFn } from 'type-graphql';
import UserService from '../../services/UserService';
import { AppContext } from '../../types';
import { verifyAccessToken } from './authUtils';

const logger = debug('app');

export const isAuth: MiddlewareFn<AppContext> = async ({ context }, next): Promise<any> => {
    const authorizationHeader = context.req.headers['authorization'];
    if (!authorizationHeader) {
        throw new Error('not authenticated');
    }
    try {
        const token = authorizationHeader.split(' ')[1];
        const payload: any = verifyAccessToken(token);
        if (payload && payload.email) {
            const contextUser = await UserService.getUserByEmail(payload.email);
            context.contextUser = contextUser;
        }
    } catch (err) {
        logger(err);
        throw new Error('not authenticated');
    }
    return next();
};
