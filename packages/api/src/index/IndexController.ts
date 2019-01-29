import { IJSONResponse } from '../types/';

class IndexController {
    public static getRootAPIRoute = (): Promise<IJSONResponse> => {
        const response: IJSONResponse = {
            success: true,
            message: 'Hello from TypeScript...',
            payload: null
        };
        return Promise.resolve(response);
    };
}

export default IndexController;
