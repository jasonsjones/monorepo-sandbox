import 'reflect-metadata';
import app from './app';
import { createDbConnection } from './utils/createDbConnection';

const PORT = process.env.PORT || 3001;

(async (): Promise<void> => {
    await createDbConnection();
    app.listen(PORT, (): void => console.log(`express server running at http://localhost:${PORT}`));
})();
