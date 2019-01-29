import Express from 'express';
import IndexController from './IndexController';

class IndexRouter {
    public static getInstance = (): Express.Router => {
        IndexRouter.configureRoutes();
        return IndexRouter.router;
    };

    private static router = Express.Router();

    private static configureRoutes = (): void => {
        IndexRouter.router.get(
            '/api',
            (req: Express.Request, res: Express.Response): void => {
                IndexController.getRootAPIRoute().then(result => {
                    res.json(result);
                });
            }
        );
    };
}

export default IndexRouter;
