import debug from 'debug';
import mongoose, { Connection } from 'mongoose';
import config from './config';

const log = debug('db');
const error = debug('db:error');

class DatabaseManager {
    public static getInstance = (): DatabaseManager => {
        log('getting instance of DatabaseManager ...');
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    };

    private static instance: DatabaseManager;
    private dbName: string;

    private constructor() {
        log('creating new DatabaseManager instance...');
    }

    public connect = (): void => {
        mongoose.connect(this.buildConnectionString(), {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });

        this.attachHandlers(mongoose.connection);
    };

    private buildConnectionString = (): string => {
        this.dbName = config.env !== 'testing' ? 'sandbox-dev' : 'sandbox-test';
        return `${config.db.baseUri}/${this.dbName}?${config.db.options}`;
    };

    private attachHandlers = (connection: Connection): void => {
        connection.once('open', () => {
            log(`Connected to ${this.dbName} on a MongoDB Atlas cluster`);
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
}

export default DatabaseManager.getInstance();
