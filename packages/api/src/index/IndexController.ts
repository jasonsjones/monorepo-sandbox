import * as pkgJson from '../../package.json';
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

    public static getAPIVersion = (): Promise<IJSONResponse> => {
        const response: IJSONResponse = {
            success: true,
            message: index.VERSION,
            payload: {
                version: pkgJson.version
            }
        };
        return Promise.resolve(response);
    };
}

export default IndexController;
