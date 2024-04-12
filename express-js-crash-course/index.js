import cookieParser from "cookie-parser";
import express from "express";
import routes from "./routers/index.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
