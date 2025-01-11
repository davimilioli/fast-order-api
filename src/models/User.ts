import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface UserAttributes {
    id?: number;
    nome: string;
    senha: string;
    email: string;
    cod: string;
    cargo: string;
    celular: number;
    ativo: boolean;
    criado_em?: Date;
    atualizado_em?: Date;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {};

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    public id!: number;
    public nome!: string;
    public senha!: string;
    public email!: string;
    public cod!: string;
    public cargo!: string;
    public celular!: number;
    public ativo!: boolean;
    public criado_em!: Date;
    public atualizado_em!: Date;
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cod: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        celular: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        criado_em: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        atualizado_em: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: true, 
        createdAt: "criado_em",
        updatedAt: "atualizado_em",
    }
);

export default User;