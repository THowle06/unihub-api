import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { createModule } from "./module.controller";

const router = Router();

router.post("/", requireAuth, createModule);

export default router;
