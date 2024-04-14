import { Router } from "express";
import passport from "passport";
import { mockUsers } from "../constants/users.js";
// import "../strategy/local-strategy.js";
import "../strategy/discord-strategy.js";

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
  return req?.session?.passport?.user
    ? res.status(200).send(req.session.passport.user)
    : res.status(403).send({ msg: "unauthorized" });
});

router.post(
  "/api/passport-auth",
  passport.authenticate("local"),
  (req, res) => {
    res.status(200).send({ msg: "success" });
  }
);

router.get("/api/auth/discord", passport.authenticate("discord"));

router.get(
  "/api/auth/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.sendStatus(200);
  }
);

export default router;
