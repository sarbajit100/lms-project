import { Router } from "express";
import { forggotPassword, getProfile, login, logout, register, resetpassword } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/forgot-password', forggotPassword);
router.post('/reset-password', resetpassword);




export default router;