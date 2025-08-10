import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import usersRepo from "./repositories/users.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["jseiogfvs23i2ji241j4kf"],
  })
);

app.listen(3000, () => {
  console.log("Listening");
});
