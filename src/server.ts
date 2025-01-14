import Express, { Application } from "express";
import routers from "./routers";
import cors from 'cors';
import sequelize from "./database/database";
import BaseService from "./services/BaseService";

class Server {
    private server: Application = Express();
    private baseService: BaseService = new BaseService();
    private port: number = Number(this.baseService.getEnv('PORT')) || 3000;

    constructor(){
        this.initMiddlewares();
        this.routers();
    }

    private initMiddlewares(): any{
        this.server.use(cors());
        this.server.use(Express.urlencoded({ extended: true }));
        this.server.use(Express.json());
    }

    private routers(): any {
        this.server.use(routers);
    }

    private async initDatabase(): Promise<void> {
        try {
            await sequelize.sync();
            await sequelize.authenticate();
        } catch (error) {
            console.error('Erro ao iniciar banco de dados', error);
        }
    }

    public async start(): Promise<void> {
        await this.initDatabase();
        this.server.listen(this.port, () => {
            this.initDatabase()
            console.log(`http://localhost:${this.port}`);
        })
    }
}

const server = new Server();
server.start();