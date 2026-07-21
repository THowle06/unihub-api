import express from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./modules/auth";
import healthRouter from "./modules/health";
import { requireAuth } from "./middleware/auth.middleware";

const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/protected", requireAuth, (req, res) => {
  res.json({
    message: "Authenticated",
    user: req.user,
  });
});

app.use("/health", healthRouter);

export default app;
