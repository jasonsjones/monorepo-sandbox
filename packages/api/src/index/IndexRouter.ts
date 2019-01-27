import * as express from 'express';
import IndexController from './IndexController';

class IndexRouter {
    public static getInstance = (): express.Router => {
        IndexRouter.configureRoutes();
        return IndexRouter.router;
    };

    private static router = express.Router();

    private static configureRoutes = (): void => {
        IndexRouter.router.get(
            '/api',
            (req: express.Request, res: express.Response): void => {
                IndexController.getRootAPIRoute().then(result => {
                    res.json(result);
                });
            }
        );
    };
}

export default IndexRouter;
