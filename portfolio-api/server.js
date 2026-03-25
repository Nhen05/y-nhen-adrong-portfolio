import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './src/config/db.js';
import projectRouter from './src/routes/projects/projectRoutes.js';
import authRoutes from "./src/routes/authRoutes.js";
import Achievement from './src/routes/achievementRoutes.js';

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// static uploads
app.use("/uploads", express.static("uploads"));

// ================= API ROUTES =================
app.use('/api/projects', projectRouter);
app.use('/api/auth', authRoutes);
app.use("/api/achievements", Achievement);
// API FOR UPTIME ROBOT
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// ================= FRONTEND =================

// fix __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// path tới frontend build
const frontendPath = path.join(__dirname, "../portfolio-frontend/dist");

// serve file tĩnh (JS, CSS)
app.use(express.static(frontendPath));

// fallback cho React Router (QUAN TRỌNG NHẤT)
app.use((req, res, next) => {
  // nếu là API thì bỏ qua
  if (req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});