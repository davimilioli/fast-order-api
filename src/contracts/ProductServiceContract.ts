import ResponseProductList from "../models/ResponseProductList"

interface ProductServiceContract {
    productList(page: number, pageSize: number): Promise<ResponseProductList>;
}

export default ProductServiceContract;