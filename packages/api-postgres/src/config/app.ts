import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import debug from 'debug';
import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { User } from '../entity/User';
import AuthResolver from '../modules/auth/AuthResolver';
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken
} from '../modules/auth/authUtils';
import StatusResolver from '../modules/status/StatusResolver';
import UserResolver from '../modules/user/UserResolver';
import UserService from '../services/UserService';
import { AppContext } from '../types';

const logger = debug('app');

const buildContext = ({ req, res }: { req: Request; res: Response }): AppContext => {
    return {
        req,
        res
    };
};

const bootstrapApolloServer = async (expressApp: Application): Promise<ApolloServer> => {
    const schema = await buildSchema({ resolvers: [StatusResolver, UserResolver, AuthResolver] });
    const apolloServer = new ApolloServer({
        schema,
        context: buildContext
    });
    apolloServer.applyMiddleware({
        app: expressApp,
        cors: {
            origin: ['http://localhost:4200', 'http://localhost:4201'],
            credentials: true
        }
    });
    return apolloServer;
};

const app = express();
app.use(cookieParser());

app.get(
    '/api/refreshtoken',
    async (req: Request, res: Response): Promise<Response> => {
        const sendEmptyAccessToken = (): Response => {
            return res.json({
                success: true,
                message: 'new access token requested.',
                payload: {
                    accessToken: ''
                }
            });
        };

        const token = req.cookies['qid'];
        if (!token) {
            return sendEmptyAccessToken();
        }

        let user;
        try {
            const payload: any = verifyRefreshToken(token);
            user = await UserService.getUserByEmail(payload.email);
            if (!user) {
                return sendEmptyAccessToken();
            }
        } catch (err) {
            logger(err.message);
            return sendEmptyAccessToken();
        }

        res.cookie('qid', createRefreshToken(user as User), { httpOnly: true });
        return res.json({
            success: true,
            message: 'new access token requested.',
            payload: {
                accessToken: createAccessToken(user as User)
            }
        });
    }
);

app.get('/api', (_, res): void => {
    res.json({ success: true, message: 'welcome to a new stack' });
});

app.get('/', (_, res): void => {
    res.json({
        success: true,
        message: 'api endpoint is not here',
        url: 'http://localhost:3001/api'
    });
});

bootstrapApolloServer(app);

export default app;
