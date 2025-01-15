import ProductService from "../services/ProductService";
import HttpController from "./HttpController";

class ProductController extends HttpController{

    private productService: ProductService = new ProductService();

    async getList(){
        const page: number = Number(this.req.query.page as string) || 1;
        const pageSize: number = Number(this.req.query.pageSize as string) || 12;

        try {
            const products = await this.productService.productList(page, pageSize);
            return this.res.status(200).json(products);
        } catch(error){
            return this.res.status(500).json('Erro interno do servidor');
        }
    }
    
    async registerProduct() {
        const { nome, categoria, descricao, preco, ativo, peso, imagem, desconto, tags } = this.req.body;

        try {

            const productData = {
                nome,
                categoria,
                descricao,
                preco,
                ativo,
                peso,
                imagem,
                desconto,
                tags,
            };

            const createProduct = await this.productService.createProduct(productData);

            return this.res.status(createProduct.statusCode).json(createProduct);

        } catch(error){
            return this.res.status(500).json('Erro interno do servidor');
        }


/*             id?: number;
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
    tags: string[]; */
    }
}

export default ProductController;