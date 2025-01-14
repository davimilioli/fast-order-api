import AuthServiceContract from "../contracts/AuthServiceContract";
import ResponseService from "./ResponseService";
import ResponseHandler from "../models/ResponseHandler";
import Login from "../models/Login";
import User from '../models/User';
import jwt from 'jsonwebtoken';
import BaseService from "./BaseService";

class AuthService implements AuthServiceContract{

    private ResponseService: ResponseService = new ResponseService();
    private baseService: BaseService = new BaseService()

    async processLogin(email: string, senha: string): Promise<ResponseHandler> {
        
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return this.ResponseService.error("Usuário não existe", 404);
            }

            if(senha !== user.dataValues.senha) {
                return this.ResponseService.error("Credenciais inválidas", 401);
            }   

            const tokenExists = await Login.findOne({ where: { user_id: user.id } })

            if(tokenExists){
                await Login.destroy({
                    where: { user_id: user.id }
                });
            }
            
            const nome = user.dataValues.nome
            const JWT_SECRET = this.baseService.getEnv('JWT_TOKEN') as string;
            const token = jwt.sign({ nome }, JWT_SECRET, { expiresIn: "1h" });
            
            await Login.create({
                user_id: user.id,
                token,
                expira_em: new Date(Date.now() + 60 * 60 * 1000),
                criado_em: new Date(),
            });
            
            return this.ResponseService.success("Login feito com sucesso", 200, {
                user: nome,
                token,
                expiration: "1h",
            });

        } catch (error) {
            console.error("Erro ao autenticar:", error);
            throw this.ResponseService.error("Erro interno no servidor", 500);
        }
    }

    async processLogout(token: string): Promise<ResponseHandler>{
        
        try {
            const login = await Login.findOne({ where: { token } });

            if (!login) {
                return this.ResponseService.error("Token não encontrado", 404);
            }
    
            await login.destroy();
    
            return this.ResponseService.success("Logout encerrado com sucesso", 200, {
                token,
            });

        } catch(error){
            console.error("Erro ao fazer logout:", error);
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