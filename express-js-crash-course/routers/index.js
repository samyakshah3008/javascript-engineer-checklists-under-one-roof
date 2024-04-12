import { Router } from "express";
import productRoutes from "./products.js";
import userRoutes from "./users.js";

const router = Router();

router.use(userRoutes);
router.use(productRoutes);

export default router;
