import { Request, Response, Router } from 'express';
import { IJSONResponse } from '../types/';
import UserController from './UserController';

class UserRouter {
    public static getInstance = (): Router => {
        UserRouter.configureRoutes();
        return UserRouter.router;
    };

    private static router = Router();
    private static configureRoutes = (): void => {
        UserRouter.router.get(
            '/',
            async (req: Request, res: Response): Promise<Response> => {
                const users = await UserController.getUsers();
                const response: IJSONResponse = {
                    success: true,
                    message: 'all users fetched',
                    payload: {
                        users
                    }
                };
                return res.json(response);
            }
        );
    };
}

export default UserRouter;
