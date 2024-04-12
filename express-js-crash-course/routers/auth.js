import { Router } from "express";

const router = Router();

router.get("/api/signin", (req, res) => {
  res.cookie("hello", "world", { maxAge: 60000 * 60 * 2 });
  res.status(200).send({ msg: "helloJS" });
});

export default router;
