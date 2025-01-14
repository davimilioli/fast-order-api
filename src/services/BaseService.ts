import BaseServiceContract from "../contracts/BaseServiceContract";
import dotenv from 'dotenv';

class BaseService implements BaseServiceContract{
    
    public getEnv(env: string): string{
        dotenv.config();
        const configEnv = process.env[env];
        
        if(configEnv === undefined){
            throw new Error(`A variável de ambiente ${env} não existe`);
        }


        return configEnv;
    }
}

export default BaseService;