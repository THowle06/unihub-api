import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { createModule, getModuleById, getModules, updateModule } from "./module.controller";

const router = Router();

router.use(requireAuth);

router.post("/", createModule);

router.get("/", getModules);

router.get("/:id", getModuleById);

router.patch("/:id", updateModule);

export default router;
