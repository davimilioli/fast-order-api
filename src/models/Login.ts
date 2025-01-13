import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface LoginAttributes {
    id?: number;
    user_id: number;
    token: string;
    expira_em: Date;
    criado_em: Date;
};

interface LoginCreationAttributes extends Optional<LoginAttributes, 'id'> {};

export class Login extends Model<LoginAttributes, LoginCreationAttributes> implements LoginAttributes{
    id!: number;
    user_id!: number;
    token!: string;
    expira_em!: Date;
    criado_em!: Date;
}

Login.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expira_em: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        criado_em: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "login",
        timestamps: false, 
        createdAt: "criado_em",
    }
);

export default Login;

