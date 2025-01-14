import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database";

export interface ProductAttributes {
    id?: number;
    nome: string;
    categoria?: string;
    descricao: string;
    preco: number;
    ativo: boolean;
    peso: number;
    imagem?: string;
    criado_em: Date;
    atualizado_em: Date;
    desconto?: number;
    tags: string[];
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'>{}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes{
    public id!: number;
    public nome!: string;
    public categoria!: string;
    public descricao!: string;
    public preco!: number;
    public ativo!: boolean;
    public peso!: number;
    public imagem!: string;
    public criado_em!: Date;
    public atualizado_em!: Date;
    public desconto!: number;
    public tags!: string[];
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    atualizado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    desconto: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: false,
        defaultValue: [], 
    },
}, {
    sequelize,
    tableName: 'produtos', 
    timestamps: false,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
})
