import express from "express";
import healthRouter from "./modules/health";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/health", healthRouter);

export default app;
