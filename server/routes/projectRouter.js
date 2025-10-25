import express from "express";
const router = express.Router();
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProjectById,
  deleteProjectById,
} from "../controllers/projectController.js";

// Get all projects
router.get("/", getAllProjects);

// Get project by ID
router.get("/:id", getProjectById);

// Add new project
router.post("/", addProject);

// Update project by ID
router.put("/:id", updateProjectById);

// Delete project by ID
router.delete("/:id", deleteProjectById);

export default router
