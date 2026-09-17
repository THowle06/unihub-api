import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { createAssignment } from "./assignment.controller";

const router = Router();

router.use(requireAuth);

router.post("/", createAssignment);

export default router;
