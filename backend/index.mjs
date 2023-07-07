import express from "express";
const { json, urlencoded } = express;
import cookieParser from "cookie-parser";
import logger from "morgan";
import { port, environment } from "./constant.mjs";

import indexRouter from "./routes/index.mjs";
// import { connect, disconnect } from "./connection.mjs";

const app = express();

app.use(logger(environment));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// await connect();

app.use(indexRouter);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running ${port}`);
});

process.on("SIGTERM", async () => {
  // await disconnect();
  console.log("SIGTERM");
  process.exit();
});
