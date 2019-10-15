import 'reflect-metadata';
// import { createDbConnection } from './utils/createDbConnection';
import app from './app';

const PORT = process.env.PORT || 3001;

// createDbConnection().then(() => {
app.listen(PORT, (): void => console.log('express server running at http://localhost:3001'));
// });
