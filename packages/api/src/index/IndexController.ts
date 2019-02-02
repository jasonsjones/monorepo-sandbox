import { index } from '../shared/response-messages';
import { IJSONResponse } from '../types/';

class IndexController {
    public static getAPIRoot = (): Promise<IJSONResponse> => {
        const response: IJSONResponse = {
            success: true,
            message: index.ROOT,
            payload: null
        };
        return Promise.resolve(response);
    };
}

export default IndexController;
