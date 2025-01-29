import ProductServiceContract from "../contracts/ProductServiceContract";
import ResponseProductList from "../models/ResponseProductList";
import { Product, ProductAttributes } from "../models/Product";
import ResponseService from "./ResponseService";
import ImageService from "./ImageService";
import ResponseHandler from "../models/ResponseHandler";

class ProductService implements ProductServiceContract{

    private responseService: ResponseService;
    private imageService: ImageService;

    constructor(){
        this.responseService = new ResponseService();
        this.imageService = new ImageService()
    }

    async productList(page: number, pageSize: number): Promise<ResponseProductList> {
        try {
            const offset = (page - 1) * pageSize;

            const {count, rows}  = await Product.findAndCountAll({
                offset: offset,
                limit: pageSize,
                order: [['id', 'ASC']]
            })

            return {
                page: page,
                pageSize: pageSize,
                total: count,
                produtos: rows
            };

        } catch(error){
            console.error('Erro ao consulta lista de produtos', error);
            throw new Error('Erro interno no servidor');
        }
    }

    async createProduct(product: ProductAttributes): Promise<ResponseHandler>{

        let processImage: string | null = null;

        try {
            if(product.imagem){
                processImage = this.imageService.processImage(product.imagem as Express.Multer.File);
                console.log(processImage)

                if(!processImage){
                    return this.responseService.success("Tipo de imagem não é válida", 401, {});
                }
            }

            console.log(processImage)

            const createProduct = await Product.create(
                {
                    ...product,
                    imagem: processImage || null,
                    criado_em: new Date(),
                    atualizado_em: new Date(),
                }
            );

            return this.responseService.success("Produto criado com sucesso", 201, {
                produto: {
                    ...createProduct.toJSON(),
                    imagem: processImage
                }
            });

        } catch(error){
            if(processImage){
                this.imageService.deleteImage(processImage);
            }

            console.error('Erro ao criar novo produto', error);
            throw new Error('Erro interno no servidor');
        }
    }

    async deleteProduct(id: number): Promise<ResponseHandler> {
        try{
            const product = await Product.findByPk(id)

            if(!product){
                return this.responseService.success(`O ID ${id} não foi encontrado`, 404, {});
            }

            await Product.destroy({ where: {id: id } });
            return this.responseService.success("Produto excluído com sucesso", 200, {
                produto: product?.dataValues
            });

        } catch(error){
            console.error('Erro ao deletar o produto', error);
            throw new Error('Erro interno no servidor');
        }
    }

    async getProduct(id: number): Promise<ProductAttributes | null> {
        try{
            const product = await Product.findByPk(id);

            if(!product){
                return null;
            }

            return product;
        } catch(error){
            console.error('Erro ao encontrar produto', error);
            throw new Error('Erro interno no servidor');
        }

    }

    async editProduct(id: number, product: ProductAttributes): Promise<ResponseHandler> {
        try {
            const existingProduct = await Product.findByPk(id);
    
            if (!existingProduct) {
                return this.responseService.success("Produto não encontrado", 404, {});
            }
    
            let processImage: string | null = null;
            const existingImage: string = String(existingProduct.dataValues.imagem);
    
            if (product.imagem && (product.imagem as Express.Multer.File).originalname !== existingImage) {
    
                if (existingImage) {
                    this.imageService.deleteImage(existingImage);
                }
    
                processImage = this.imageService.processImage(product.imagem as Express.Multer.File);
    
                if (!processImage) {
                    return this.responseService.success("Tipo de imagem não é válida", 401, {});
                }

            } else {
                processImage = existingImage;
            }
    
            await existingProduct.update({
                nome: product.nome || existingProduct.nome,
                categoria: product.categoria || existingProduct.categoria,
                descricao: product.descricao || existingProduct.descricao,
                preco: product.preco || existingProduct.preco,
                ativo: product.ativo !== undefined ? product.ativo : existingProduct.ativo,
                peso: product.peso || existingProduct.peso,
                imagem: processImage,
                atualizado_em: new Date(),
                desconto: product.desconto || existingProduct.desconto,
                tags: product.tags || existingProduct.tags,
            });
    
            return this.responseService.success("Produto atualizado com sucesso", 200, {
                produto: {
                    ...existingProduct.toJSON(),
                    imagem: processImage,
                }
            });
    
        } catch (error) {
            console.error('Erro ao atualizar produto', error);
            throw new Error('Erro interno no servidor');
        }
    }
    
     
    
}

export default ProductService;