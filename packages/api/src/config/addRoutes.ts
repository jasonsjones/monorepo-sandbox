import { Application } from 'express';
import IndexRouter from '../index/IndexRouter';
import UserRouter from '../user/UserRouter';

const addRoutes = (app: Application): void => {
    app.use('/api', IndexRouter.getInstance());
    app.use('/api/users', UserRouter.getInstance());
};

export default addRoutes;
