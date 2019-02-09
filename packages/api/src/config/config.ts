import dotenv from 'dotenv';
dotenv.config();

const {
    NODE_ENV: env = 'development',
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
    DB_NAME: dbName,
    DB_HOST1: dbHost1,
    DB_HOST2: dbHost2,
    DB_HOST3: dbHost3,
    DB_OPTIONS: dbOptions
} = process.env;

const db = {
    baseUri: `mongodb://${dbUser}:${dbPassword}@${dbHost1},${dbHost2},${dbHost3}`,
    name: dbName,
    options: dbOptions
};

export default {
    env,
    db
};
