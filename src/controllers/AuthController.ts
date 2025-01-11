import AuthService from "../services/AuthService";
import HttpController from "./HttpController";

class AuthController extends HttpController{

    private authService = new AuthService();
    
    async handleLogin(){
        const { email, senha } = this.req.body;

        try {
            const auth = await this.authService.processLogin(email, senha);
            return this.res.status(auth.statusCode).json(auth);
        } catch(error){
            return this.res.status(500).json('Erro interno do servidor');
        } 
    }
}

export default AuthController;