import { MiddlewareFn } from 'type-graphql';
import { AppContext } from '../../types';
import { verifyAccessToken } from './authUtils';

export const isAuth: MiddlewareFn<AppContext> = ({ context }, next): Promise<any> => {
    const authorizationHeader = context.req.headers['authorization'];
    if (!authorizationHeader) {
        throw new Error('not authenticated');
    }
    try {
        const token = authorizationHeader.split(' ')[1];
        const payload = verifyAccessToken(token);
        context.contextUser = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error('not authenticated');
    }
    return next();
};
