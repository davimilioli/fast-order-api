import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post('/login',  (req, res) => {
    const authController = new AuthController(req, res);
    authController.handleLogin()
});

router.post('/logout', (req, res) => {
    const authController = new AuthController(req, res);
    authController.handleLogout();
})

export default router;