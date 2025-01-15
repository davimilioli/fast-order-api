import ProductService from "../services/ProductService";
import HttpController from "./HttpController";

class ProductController extends HttpController{

    productService = new ProductService();

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
}

export default ProductController;