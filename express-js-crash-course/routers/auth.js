import { Router } from "express";
import { mockUsers } from "../constants/users.js";

const router = Router();

router.get("/api/signin", (req, res) => {
  // console.log(req.session);
  // console.log(req.sessionID);
  req.session.visited = true;
  res.cookie("my custom cookie", "world", {
    maxAge: 60000 * 60 * 2,
    signed: true,
  });
  res.status(200).send({ msg: "helloJS" });
});

router.post("/api/signin", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "Bad credentials" });

  req.session.user = findUser;
  return res.status(200).send({ msg: "success login" });
});

router.get("/api/auth/status", (req, res) => {
  // console.log(req.session.user, "user");
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session, "session");
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(403).send({ msg: "unauthorized" });
});

export default router;
