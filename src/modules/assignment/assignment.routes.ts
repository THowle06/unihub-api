import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  createAssignment,
  getAssignmentById,
  getAssignments,
  updateAssignment,
} from "./assignment.controller";

const router = Router();

router.use(requireAuth);

router.post("/", createAssignment);

router.get("/", getAssignments);

router.get("/:id", getAssignmentById);

router.patch("/:id", updateAssignment);

export default router;
