import dotenv from 'dotenv';
dotenv.config();

const {
    NODE_ENV: env = 'development',
    JWT_SECRET: jwtSecret = '$$jwtTokenSecret%%',
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
    DB_HOST1: dbHost1 = 'dev-cluster-shard-00-00-vqlo1.gcp.mongodb.net:27017',
    DB_HOST2: dbHost2 = 'dev-cluster-shard-00-01-vqlo1.gcp.mongodb.net:27017',
    DB_HOST3: dbHost3 = 'dev-cluster-shard-00-02-vqlo1.gcp.mongodb.net:27017',
    DB_OPTIONS: dbOptions = 'ssl=true&replicaSet=dev-cluster-shard-0&authSource=admin&retryWrites=true'
} = process.env;

const db = {
    baseUri: `mongodb://${dbUser}:${dbPassword}@${dbHost1},${dbHost2},${dbHost3}`,
    options: dbOptions
};

export default {
    env,
    db,
    jwtSecret
};
