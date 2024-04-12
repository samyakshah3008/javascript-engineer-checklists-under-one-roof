import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  res.status(200).send({ message: "products data will come here" });
});

export default router;
