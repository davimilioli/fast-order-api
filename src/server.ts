import Express from "express";
import dotenv from 'dotenv';
import routers from "./routers";
import cors from 'cors';
import sequelize from "./database/database";
dotenv.config();

const server = Express();
const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(Express.urlencoded({ extended: true }));
server.use(Express.json());
server.use(routers);

server.listen(PORT, () => {
    initDatabase()
    console.log(`http://localhost:${PORT}`);
})

async function initDatabase(){
    try {
        await sequelize.sync();
        await sequelize.authenticate();
    } catch(error){
        console.error('Erro ao iniciar banco de dados', error);
    }
}