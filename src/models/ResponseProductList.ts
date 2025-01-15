import { ProductAttributes } from "./Product";

interface ResponseProductList {
    page: number;
    pageSize: number;
    total: number;
    produtos?: ProductAttributes[]
}

export default ResponseProductList;