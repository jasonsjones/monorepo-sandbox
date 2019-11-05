import { ConnectionOptions } from 'typeorm';

const cliOptions = {
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
};

const commonOptions = {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    ...cliOptions
};

export const dbOptions: ConnectionOptions[] = [
    {
        name: 'development',
        type: 'postgres',
        database: 'sandbox-dev',
        ...commonOptions
    },
    {
        name: 'testing',
        type: 'postgres',
        database: 'sandbox-test',
        dropSchema: true,
        ...commonOptions
    },
    {
        name: 'production',
        type: 'postgres',
        url: process.env.DATABASE_URL || 'postgres://postgres@localhost/sandbox-dev'
    }
];
