import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import passport from "passport";
import routes from "./routers/index.js";
import "./strategy/local-strategy.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("samyak the dev", { signed: true }));
app.use(
  session({
    secret: "samyak the dev",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/passport-auth", passport.authenticate("local"), (req, res) => {
  res.status(200).send({ msg: "success" });
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
