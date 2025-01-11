import ResponseHandler from "../models/ResponseHandler";

interface AuthServiceContract {
    processLogin(email: string, senha: string): Promise<ResponseHandler>;
}

export default AuthServiceContract;