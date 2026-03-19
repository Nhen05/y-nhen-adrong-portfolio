import express from "express"
import upload from "../../middleware/upload.js"
import auth from "../../middleware/auth.js"

import {
 getProjects,
 createProject,
 deleteProject,
 updateProject,
 getProjectById
} from "../../controllers/projectController.js"

const router = express.Router()

// Public
router.get("/", getProjects)
router.get("/:id", getProjectById)

// Protected (cần token)
router.post("/", auth, upload.single("image"), createProject)
router.put("/:id", auth, upload.single("image"), updateProject)
router.delete("/:id", auth, deleteProject)

export default router