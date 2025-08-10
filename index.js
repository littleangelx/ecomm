import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import authRouter from "./routes/admin/auth.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["jseiogfvs23i2ji241j4kf"],
  })
);
app.use(authRouter);

app.listen(3000, () => {
  console.log("Listening");
});
