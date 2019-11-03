import 'reflect-metadata';
import express from 'express';
import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import StatusResolver from './resolvers/StatusResolver';
// import UserResolver from './resolvers/UserResolver';
// import AuthResolver from './resolvers/AuthResolver';

const bootstrapApolloServer = async (expressApp: Application): Promise<ApolloServer> => {
    const schema = await buildSchema({ resolvers: [StatusResolver] });
    const apolloServer = new ApolloServer({ schema });
    apolloServer.applyMiddleware({ app: expressApp });
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
