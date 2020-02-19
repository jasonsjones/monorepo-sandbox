import { createConnection, getConnectionOptions, Connection, ConnectionOptions } from 'typeorm';
import { dbOptions } from './dbConnectionOptions';

enum Env {
    DEVELOPMENT,
    TESTING,
    PRODUCITON
}

const getConnectionOptionsForEnv = (env: Env): ConnectionOptions => {
    return dbOptions[env];
};

const getEnvironment = (env: string | undefined): Env => {
    let value: Env = Env.DEVELOPMENT;
    switch (env) {
        case 'development':
            value = Env.DEVELOPMENT;
            break;
        case 'testing':
            value = Env.TESTING;
            break;
        case 'production':
            value = Env.PRODUCITON;
            break;
        default:
            break;
    }
    return value;
};

export const createDbConnection = async (): Promise<Connection> => {
    const env: Env = getEnvironment(process.env.NODE_ENV);
    const connectionOptions = await getConnectionOptionsForEnv(env);
    return createConnection({ ...connectionOptions, name: 'default' });
};

export const createPostgresConnection = async (): Promise<Connection> => {
    const env = process.env.NODE_ENV;
    if (env !== 'production') {
        const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
        return createConnection({ ...connectionOptions, name: 'default' });
    }
    return createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL
    });
};
