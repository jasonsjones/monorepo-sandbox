import * as pkgJson from '../../package.json';

class IndexController {
    public static getAPIRoot = (): Promise<any> => {
        return Promise.resolve(null);
    };

    public static getAPIVersion = (): Promise<string> => {
        return Promise.resolve(pkgJson.version);
    };
}

export default IndexController;
