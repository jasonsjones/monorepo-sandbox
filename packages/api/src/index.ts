import debug from 'debug';
import AppProvider from './config/AppProvider';

const log = debug('app');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    const app = await AppProvider.getInstance();
    app.listen(PORT, () => {
        log(`App is running on http://localhost:${PORT}/api`);
    });
};

startServer();
