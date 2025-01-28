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
        const { nome, categoria, descricao, preco, ativo, peso, desconto, tags } = this.req.body;
        let imagem = this.req.file || null;
        
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

    }

    async removeProduct(){
        const id: number = Number(this.req.params.id as string)
        
        if(!id){
            return this.res.status(401).json('O ID precisa ser passado.');
        }

        try {
            const deleteProduct = await this.productService.deleteProduct(id)
            return this.res.status(deleteProduct.statusCode).json(deleteProduct);
        }catch(error){
            return this.res.status(500).json('Erro interno do servidor');
        }
    }

    async findProduct(){
        const id: number = Number(this.req.params.id as string);

        if(!id){
            return this.res.status(401).json('O ID precisa ser passado.');
        }

        try{
            const getProduct = await this.productService.getProduct(id);

            if(getProduct === null){
                return this.res.status(404).json([])
            }

            return this.res.status(200).json(getProduct);
        } catch(error){
            return this.res.status(500).json('Erro interno do servidor');
        }
    }

    async modifyProduct() {
        const id: number = Number(this.req.params.id);
    
        if (!id) {
            return this.res.status(401).json({ message: 'O ID precisa ser passado.' });
        }
    
        const { nome, categoria, descricao, preco, ativo, peso, desconto, tags } = this.req.body;
        let imagem = this.req.file || null;

        console.log(this.req.body)
    
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
    
            console.log(productData)
            const modifyProduct = await this.productService.editProduct(id, productData); 

            return this.res.status(200).json(modifyProduct);
        } catch (error) {
            console.error('Erro ao modificar produto', error);
            return this.res.status(500).json('Erro interno do servidor');
        }
    }
    
}

export default ProductController;