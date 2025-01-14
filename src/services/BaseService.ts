import BaseServiceContract from "../contracts/BaseServiceContract";
import dotenv from 'dotenv';

class BaseService implements BaseServiceContract{
    
    public getEnv(env: string){
        dotenv.config();
        return process.env[env];
    }
}

export default BaseService;