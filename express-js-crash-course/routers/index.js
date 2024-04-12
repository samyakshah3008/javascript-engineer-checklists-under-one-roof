import { Router } from "express";
import authRoutes from "./auth.js";
import productRoutes from "./products.js";
import userRoutes from "./users.js";

const router = Router();

router.use(userRoutes);
router.use(productRoutes);
router.use(authRoutes);

export default router;
