import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { Application, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import StatusResolver from '../modules/status/StatusResolver';
import UserResolver from '../modules/user/UserResolver';
import AuthResolver from '../modules/auth/AuthResolver';
import { AugmentedRequest } from '../types';

const buildContext = ({
    req,
    res
}: {
    req: Request;
    res: Response;
}): { req: AugmentedRequest; res: Response } => {
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
