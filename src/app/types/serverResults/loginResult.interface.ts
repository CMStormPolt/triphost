export interface LoginResult {
    successful: boolean;
    serverError?: LoginServerError;
}

export enum LoginServerError {
    wrongUser = 'Wrong User',
    internalServerError = 'Internal Server Error'
}