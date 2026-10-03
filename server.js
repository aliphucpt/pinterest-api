import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appError.helper.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logAPI } from "./src/common/middlewares/log-api.middleware.js";
import { appLimit } from "./src/common/middlewares/rateLimit.middleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(logAPI());

app.use(express.static("public"));

// Route kiểm tra link deploy
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Pinterest API is running",
  });
});

app.use("/api", appLimit, rootRouter);

app.use(appError);

const PORT = process.env.PORT || 3069;

app.listen(PORT, () => {
  console.log(`Server online at localhost:${PORT}`);
});