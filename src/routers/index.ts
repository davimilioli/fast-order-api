import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController";
import multer from "multer";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/login',  (req, res) => {
    const authController = new AuthController(req, res);
    authController.handleLogin()
});

router.post('/logout', (req, res) => {
    const authController = new AuthController(req, res);
    authController.handleLogout();
})

router.get('/products', (req, res) => {
    const productController = new ProductController(req, res);
    productController.getList();
})

router.post('/products', upload.single('imagem'),(req, res) => {
    const productController = new ProductController(req, res);
    productController.registerProduct();
})

export default router;