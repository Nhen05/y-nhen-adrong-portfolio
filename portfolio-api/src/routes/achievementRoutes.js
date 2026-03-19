import express from "express";
import {
  createAchievement,
  getAchievements,
  updateAchievement,
  deleteAchievement
} from "../controllers/achievementController.js";

import auth from "../middleware/auth.js"; 

const router = express.Router();

// public
router.get("/", getAchievements);

// protected
router.post("/", auth, createAchievement);
router.put("/:id", auth, updateAchievement);
router.delete("/:id", auth, deleteAchievement);

export default router;