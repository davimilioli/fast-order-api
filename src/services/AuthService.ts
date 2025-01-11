import AuthServiceContract from "../contracts/AuthServiceContract";
import ResponseService from "./ResponseService";
import ResponseHandler from "../models/ResponseHandler";
import User from '../models/User';
import jwt from 'jsonwebtoken';
import HttpService from "./ResponseService";

class AuthService implements AuthServiceContract{

    private ResponseService = new ResponseService();


    async processLogin(email: string, senha: string): Promise<ResponseHandler> {
        
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return this.ResponseService.error("Usuário não existe", 404);
            }

            const nome = user.dataValues.nome

            const JWT_SECRET = process.env.JWT_TOKEN as string;

            if(senha === user.dataValues.senha) {
                const token = jwt.sign({ nome }, JWT_SECRET, { expiresIn: "1h" });
                
                return this.ResponseService.success("Login feito com sucesso", 200, {
                    user: nome,
                    token,
                    expiration: "1h",
                });
            }   

            return this.ResponseService.error("Credenciais inválidas", 401);
        } catch (error) {
            console.error("Erro ao autenticar:", error);
            throw this.ResponseService.error("Erro interno no servidor", 500);
        }
    }
    
}

/* async function criarUsuario() {
    try {
        const nome = "Davi Milioli";
        const email = "davi.milioli@orderfast.com.br";
        const senha = "orderfast@2025";
        const celular = 999999999;
        const cod = "USR001";
        const cargo = "admin";
        const ativo = true;
        
        const usuario = await User.create({
            nome,
            senha,
            email,
            cod,
            cargo,
            celular,
            ativo,
        });

        console.log("Usuário criado com sucesso:", usuario.toJSON());
    } catch (error) {
        console.error("Erro ao criar o usuário:", error);
    }
}

criarUsuario()
 */


export default AuthService;