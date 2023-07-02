import express from "express";
const { json, urlencoded } = express;
import cookieParser from "cookie-parser";
import logger from "morgan";
import { port, environment } from "./constant.mjs";

import indexRouter from "./routes/index.mjs";
import usersRouter from "./routes/users.mjs";

var app = express();

app.use(logger(environment));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.listen(
  {
    port,
  },
  () => {
    console.log(`Server running ${port}`);
  }
);
