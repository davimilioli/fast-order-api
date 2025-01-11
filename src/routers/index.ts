import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post('/login',  (req, res) => {
    const authController = new AuthController(req, res);
    authController.handleLogin()
});

export default router;