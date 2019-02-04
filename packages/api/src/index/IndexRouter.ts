import { Request, Response, Router } from 'express';
import IndexController from './IndexController';

class IndexRouter {
    public static getInstance = (): Router => {
        IndexRouter.configureRoutes();
        return IndexRouter.router;
    };

    private static router = Router();

    private static configureRoutes = (): void => {
        IndexRouter.router.get(
            '/api',
            async (req: Request, res: Response): Promise<Response> => {
                const result = await IndexController.getAPIRoot();
                return res.json(result);
            }
        );

        IndexRouter.router.get(
            '/api/version',
            async (req: Request, res: Response): Promise<Response> => {
                const result = await IndexController.getAPIVersion();
                return res.json(result);
            }
        );
    };
}

export default IndexRouter;
