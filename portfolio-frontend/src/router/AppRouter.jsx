import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Achievements from "../pages/Achievements";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";

// Admin pages
import AdminDashboard from "../admin/AdminDashboard";
import AdminProjects from "../admin/AdminProjects";
import AdminAchievements from "../admin/AdminAchievements";
import Login from "../admin/Login";

// ← Import this
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* ADMIN SECTION */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Public – anyone can visit to log in */}
          <Route path="login" element={<Login />} />

          {/* Protected – only logged-in users */}
          <Route element={<ProtectedRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="achievements" element={<AdminAchievements />} />
          </Route>
        </Route>

        {/* Optional: 404 page */}
        <Route path="*" element={<div>404 - Not Found</div>} />

      </Routes>
    </BrowserRouter>
  );
}