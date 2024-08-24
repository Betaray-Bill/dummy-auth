import express from 'express';
import { login, register, suma } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/pro").get(protect, suma) 
router.post("/login", login)
router.post("/register", register)

export default router