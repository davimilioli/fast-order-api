import ProductServiceContract from "../contracts/ProductServiceContract";
import ResponseProductList from "../models/ResponseProductList";
import { Product, ProductAttributes } from "../models/Product";
import ResponseService from "./ResponseService";
import ResponseHandler from "../models/ResponseHandler";
import ImageService from "./ImageService";

class ProductService implements ProductServiceContract{

    private responseService: ResponseService = new ResponseService();
    private imageService: ImageService = new ImageService();

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

    async createProduct(product: ProductAttributes): Promise<any>{
        try {

            if(product.imagem){
                const processImage = this.imageService.processImage(product.imagem as Express.Multer.File);

                if(!processImage){
                    return this.responseService.success("Tipo de imagem não é válida", 401, {});
                }

                product.imagem = processImage as string;
            }

            await Product.create(
                {
                    ...product,
                    criado_em: new Date(),
                    atualizado_em: new Date(),
                }
            );

            return this.responseService.success("Produto criado com sucesso", 201, {
                produto: product
            });

        } catch(error){
            console.error('Erro ao criar novo produto', error);
            throw new Error('Erro interno no servidor');
        }
    }
}

export default ProductService;