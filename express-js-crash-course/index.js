import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import routes from "./routers/index.js";

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
app.use(routes);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
