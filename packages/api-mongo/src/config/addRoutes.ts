import { Application } from 'express';

const addRoutes = (app: Application): void => {
    app.get('/api', (req, res) =>
        res.json({
            success: true,
            message: 'This is the only RESTful endpoint'
        })
    );
};

export default addRoutes;
