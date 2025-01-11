export default interface ResponseHandler {
    status: string;
    message: string;
    statusCode: number;
    data?: {
        user: string;
        token: string;
        expiration: string
    }
}