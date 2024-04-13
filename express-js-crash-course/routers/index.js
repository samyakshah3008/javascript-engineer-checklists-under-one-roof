import { Router } from "express";
import authRoutes from "./auth.js";
import cartRoutes from "./cart.js";
import productRoutes from "./products.js";
import userRoutes from "./users.js";
const router = Router();

router.use(userRoutes);
router.use(productRoutes);
router.use(authRoutes);
router.use(cartRoutes);

export default router;
