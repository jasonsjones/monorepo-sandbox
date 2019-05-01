import { Application } from 'express';
import IndexRouter from '../index/IndexRouter';
import userRouter from '../user/userRouter';

const addRoutes = (app: Application): void => {
    app.use('/api', IndexRouter.getInstance());
    app.use('/api/users', userRouter);
};

export default addRoutes;
