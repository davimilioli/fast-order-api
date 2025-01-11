import { Request, Response } from "express";

class HttpController {
    protected req: Request;
    protected res: Response;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }
}
 
export default HttpController;