import ProductServiceContract from "../contracts/ProductServiceContract";
import ResponseProductList from "../models/ResponseProductList";
import { Product } from "../models/Product";

class ProductService implements ProductServiceContract{
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
}

export default ProductService;