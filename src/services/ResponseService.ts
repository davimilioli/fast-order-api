import ResponseHandler from "../models/ResponseHandler";
import ResponseServiceContract from "../contracts/ResponseServiceContract";

class ResponseService implements ResponseServiceContract {

    public success(message: string, statusCode: number, data: any): ResponseHandler {
        return {
            status: 'success',
            message,
            statusCode,
            data,
        };
    }

    public error(message: string, statusCode: number): ResponseHandler {
        return {
            status: 'error',
            message,
            statusCode,
        };
    }
}

export default ResponseService;