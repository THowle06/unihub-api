import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { createAssignment, getAssignmentById, getAssignments } from "./assignment.controller";

const router = Router();

router.use(requireAuth);

router.post("/", createAssignment);

router.get("/", getAssignments);

router.get("/:id", getAssignmentById);

export default router;
