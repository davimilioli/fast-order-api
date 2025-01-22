export default interface ResponseHandler {
    status: string;
    message: string;
    statusCode: number;
    data?: {}
}