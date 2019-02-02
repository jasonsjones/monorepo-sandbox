interface IPayload {
    version?: string;
}

export interface IJSONResponse {
    success: boolean;
    message: string;
    payload: IPayload | null;
}
