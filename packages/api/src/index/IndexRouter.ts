import { Request, Response, Router } from 'express';
import { index } from '../shared/response-messages';
import { IJSONResponse } from '../types/';
import IndexController from './IndexController';

class IndexRouter {
    public static getInstance = (): Router => {
        IndexRouter.configureRoutes();
        return IndexRouter.router;
    };

    private static router = Router();

    private static configureRoutes = (): void => {
        IndexRouter.router.get(
            '/',
            async (req: Request, res: Response): Promise<Response> => {
                const result = await IndexController.getAPIRoot();
                const response: IJSONResponse = {
                    success: true,
                    message: index.ROOT,
                    payload: result
                };
                return res.json(response);
            }
        );

        IndexRouter.router.get(
            '/version',
            async (req: Request, res: Response): Promise<Response> => {
                const version = await IndexController.getAPIVersion();
                const response: IJSONResponse = {
                    success: true,
                    message: index.VERSION,
                    payload: {
                        version
                    }
                };
                return res.json(response);
            }
        );
    };
}

export default IndexRouter;
