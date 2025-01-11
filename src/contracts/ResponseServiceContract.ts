import ResponseHandler from "../models/ResponseHandler"

interface ResponseServiceContract{
    success(message: string, statusCode: number, data: any): ResponseHandler;
    error(message: string, statusCode: number): ResponseHandler;
}

export default ResponseServiceContract;