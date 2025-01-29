import ResponseProductList from "../models/ResponseProductList";
import { ProductAttributes } from "../models/Product";
import ResponseHandler from "../models/ResponseHandler";

interface ProductServiceContract {
    productList(page: number, pageSize: number): Promise<ResponseProductList>;
    createProduct(product: ProductAttributes): Promise<ResponseHandler>;
    deleteProduct(id: number): Promise<ResponseHandler>;
    getProduct(id: number): Promise<ProductAttributes | null>;
    editProduct(id: number, product: ProductAttributes): Promise<ResponseHandler>;
}

export default ProductServiceContract;