interface IJSONResponse {
    success: boolean;
    message: string;
    payload?: object;
}

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
