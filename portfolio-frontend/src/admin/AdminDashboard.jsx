import { useState, useEffect } from "react";
import { BsBriefcase, BsTrophy, BsSpeedometer2 } from "react-icons/bs";
import { Table } from "react-bootstrap";

import { getProjects } from "../services/projectService";       // điều chỉnh path nếu cần
import { getAchievements } from "../services/achievementService";
import './AdminDashboard.css'
export default function AdminDashboard() {
  const [projectStats, setProjectStats] = useState({
    total: 0,
  });
  const [certStats, setCertStats] = useState({
    totalAchievements: 0,
    totalCertifications: 0,
    recentCount: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentCerts, setRecentCerts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Lấy projects (không truyền page/limit → lấy tất cả)
        const projectsRes = await getProjects(); // hoặc getProjects(1, 999) nếu muốn rõ ràng

        // projectsRes có dạng { total, page, pages, projects: [...] }
        const allProjects = Array.isArray(projectsRes.projects)
          ? projectsRes.projects
          : [];

        setProjectStats({
          total: projectsRes.total || allProjects.length,
        });

        // Recent projects: 5 mới nhất
        const sortedProjects = [...allProjects]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((proj) => ({
            id: proj._id || proj.id,
            name: proj.title || "Không có tiêu đề",
            date: proj.createdAt
              ? new Date(proj.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "N/A",
          }));

        setRecentProjects(sortedProjects);

        // 2. Lấy achievements
        const achievementsRes = await getAchievements();

        // Giả định achievementsRes cũng có dạng tương tự hoặc là mảng trực tiếp
        const allAchievements = Array.isArray(achievementsRes)
          ? achievementsRes
          : Array.isArray(achievementsRes?.achievements)
            ? achievementsRes.achievements
            : Array.isArray(achievementsRes?.data)
              ? achievementsRes.data
              : [];

        const totalAchievements = allAchievements.length;

        setCertStats({
          totalAchievements,
          totalCertifications: totalAchievements, // giữ nguyên vì bạn chưa phân biệt
          recentCount: Math.min(5, totalAchievements),
        });

        // Recent achievements: 5 mới nhất
        const sortedAchievements = [...allAchievements]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((ach) => ({
            id: ach._id || ach.id,
            name: ach.title || ach.name || "Không có tiêu đề",
            date: ach.createdAt
              ? new Date(ach.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "N/A",
          }));

        setRecentCerts(sortedAchievements);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Không thể tải dữ liệu dashboard. Vui lòng kiểm tra server hoặc đăng nhập lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "1.2rem",
          minHeight: "100vh",
          background: "#0a0e17",
        }}
      >
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          color: "#f87171",
          fontSize: "1.2rem",
          minHeight: "100vh",
          background: "#0a0e17",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem 1.5rem", background: "#0a0e17", minHeight: "100vh" }}>
      {/* Header */}
      <h2
        style={{
          marginBottom: "2rem",
          fontWeight: 700,
          color: "#3b82f6",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <BsSpeedometer2 size={36} />
        Admin Dashboard
      </h2>

      {/* KPI Cards */}
      <div className="row g-4 mb-5">
        {/* Projects */}
        <div className="col-lg-6">
          <div
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(59,130,246,0.15)", padding: "1rem", borderRadius: "50%" }}>
                <BsBriefcase size={32} style={{ color: "#3b82f6" }} />
              </div>
              <h5 style={{ margin: 0, fontWeight: 600 }}>Projects Overview</h5>
            </div>

            <div className="row g-3 text-center">
              <div className="col-12">
                <div style={{ padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                  <h3 style={{ margin: 0, fontWeight: 700 }}>{projectStats.total}</h3>
                  <small style={{ color: "#94a3b8" }}>Total Projects</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="col-lg-6">
          <div
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(234,179,8,0.15)", padding: "1rem", borderRadius: "50%" }}>
                <BsTrophy size={32} style={{ color: "#eab308" }} />
              </div>
              <h5 style={{ margin: 0, fontWeight: 600 }}>Achievements & Certifications</h5>
            </div>

            <div className="row g-3 text-center">
              <div className="col-6">
                <div style={{ padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                  <h3 style={{ margin: 0, fontWeight: 700 }}>{certStats.totalAchievements}</h3>
                  <small style={{ color: "#94a3b8" }}>Total</small>
                </div>
              </div>
              <div className="col-6">
                <div style={{ padding: "1rem", background: "rgba(168,85,247,0.15)", borderRadius: "8px" }}>
                  <h3 style={{ margin: 0, fontWeight: 700 }}>{certStats.totalCertifications}</h3>
                  <small style={{ color: "#c084fc" }}>Total</small>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", color: "#94a3b8", fontSize: "0.9rem" }}>
              Recent: <strong style={{ color: "#facc15" }}>{certStats.recentCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="row g-4">
        {/* Recent Projects */}
        <div className="col-lg-6">
          <div
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <h5 style={{ marginBottom: "1rem", fontWeight: 600, color: "#3b82f6" }}>
              Recent Projects
            </h5>
            <Table bordered hover variant="dark" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((proj) => (
                  <tr key={proj.id}>
                    <td>{proj.name}</td>
                    <td>{proj.date}</td>
                  </tr>
                ))}
                {recentProjects.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-center py-4">
                      Chưa có dự án nào
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="col-lg-6">
          <div
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <h5 style={{ marginBottom: "1rem", fontWeight: 600, color: "#eab308" }}>
              Recent Achievements
            </h5>
            <Table bordered hover variant="dark" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentCerts.map((cert) => (
                  <tr key={cert.id}>
                    <td>{cert.name}</td>
                    <td>{cert.date}</td>
                  </tr>
                ))}
                {recentCerts.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-center py-4">
                      Chưa có thành tựu nào
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Quick Glance */}
      <div style={{ marginTop: "3rem" }}>
        <h5 style={{ marginBottom: "1.5rem", color: "#94a3b8" }}>Quick Glance</h5>
        <div className="row g-3">
          <div className="col-md-4 col-6">
            <div style={{ padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px", textAlign: "center" }}>
              <h6 style={{ margin: "0 0 0.25rem" }}>{projectStats.total}</h6>
              <small style={{ color: "#94a3b8" }}>Projects</small>
            </div>
          </div>
          <div className="col-md-4 col-6">
            <div style={{ padding: "1rem", background: "rgba(59,130,246,0.1)", borderRadius: "8px", textAlign: "center" }}>
              <h6 style={{ margin: "0 0 0.25rem" }}>{certStats.totalAchievements}</h6>
              <small style={{ color: "#94a3b8" }}>Achievements</small>
            </div>
          </div>
          <div className="col-md-4 col-6">
            <div style={{ padding: "1rem", background: "rgba(168,85,247,0.1)", borderRadius: "8px", textAlign: "center" }}>
              <h6 style={{ margin: "0 0 0.25rem" }}>{certStats.totalCertifications}</h6>
              <small style={{ color: "#94a3b8" }}>Total</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}