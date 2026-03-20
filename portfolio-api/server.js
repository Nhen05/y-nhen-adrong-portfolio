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

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// API routes
app.use('/api/projects', projectRouter);
app.use('/api/auth', authRoutes);
app.use("/api/achievements", Achievement);

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve frontend
app.use(express.static(path.join(__dirname, "../portfolio-frontend/dist")));

// fallback React
app.get((req, res) => {
  res.sendFile(
    path.join(__dirname, "../portfolio-frontend/dist/index.html")
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});