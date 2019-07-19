import debug from 'debug';
import mongoose, { Connection } from 'mongoose';
import config from './config';

const log = debug('db');
const error = debug('db:error');

let dbConnection: Connection;

const getDbName = (): string => {
    return config.env !== 'testing' ? 'sandbox-dev' : 'sandbox-test';
};

const buildConnectionString = (): string => {
    return `${config.db.baseUri}/${getDbName()}?${config.db.options}`;
};

const attachHandlers = (connection: Connection): void => {
    connection.once('open', () => {
        log(`Connected to ${getDbName()} on a MongoDB Atlas cluster`);
    });

    connection.on('error', () => {
        error('connection error');
    });

    connection.on('disconnected', () => {
        log(`db disconnected`);
    });

    process.on('SIGINT', () => {
        connection.close(() => {
            log('default connection closed via app termination');
            process.exit(0);
        });
    });

    process.once('SIGUSR2', () => {
        connection.close(() => {
            log('default connection closed via ts-node-dev restart');
            process.kill(process.pid, 'SIGUSR2');
        });
    });
};

export const dbConnect = (): Connection => {
    if (dbConnection) {
        return dbConnection;
    } else {
        mongoose.connect(buildConnectionString(), {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });

        dbConnection = mongoose.connection;
        attachHandlers(dbConnection);

        return dbConnection;
    }
};

export const getDbConnection = (): Connection => {
    if (dbConnection) {
        return dbConnection;
    }
    return null;
};
