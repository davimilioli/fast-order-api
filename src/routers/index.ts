import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController";

const router = Router();

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

export default router;