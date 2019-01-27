import * as express from 'express';

const startServer = () => {
    const app = express();

    app.get('/api', (req, res) => {
        res.json({
            success: true,
            message: 'Hello from TypeScript...',
            payload: null
        });
    });

    app.listen(3000, () => {
        console.log('App running at https://localhost:3000');
    });
};

startServer();
