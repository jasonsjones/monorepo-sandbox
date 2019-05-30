import { Application } from 'express';
import IndexRouter from '../index/IndexRouter';

const addRoutes = (app: Application): void => {
    app.use('/api', IndexRouter.getInstance());
};

export default addRoutes;
