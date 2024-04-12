import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  if (req.cookies.hello && req.cookies.hello === "world") {
    res.status(200).send({ message: "products data will come here" });
  } else {
    res.status(403).send({ msg: "please log in to access cart items" });
  }
});

export default router;
