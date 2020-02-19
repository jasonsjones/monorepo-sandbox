import 'reflect-metadata';
// import { createConnection } from 'typeorm';
import app from './config/app';
import { createPostgresConnection } from './utils/createDbConnection';

process.env.TZ = 'UTC';
const PORT = process.env.PORT || 3001;

(async (): Promise<void> => {
    // await createDbConnection();
    await createPostgresConnection();
    app.listen(PORT, (): void => console.log(`express server running at http://localhost:${PORT}`));
})();
