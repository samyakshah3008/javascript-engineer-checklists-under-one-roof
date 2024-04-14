import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routers/index.js";
// import "./strategy/local-strategy.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/express_tutorial")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("samyak the dev", { signed: true }));
app.use(
  session({
    secret: "samyak the dev",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
