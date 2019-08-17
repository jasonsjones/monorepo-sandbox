import { Application } from 'express';
import { verifyemail } from '../user/userController';

const addRoutes = (app: Application): void => {
    app.get('/api', (req, res) =>
        res.json({
            success: true,
            message: 'This is the only RESTful endpoint'
        })
    );

    app.get('/api/verifyemail/:token', verifyemail);
};

export default addRoutes;
