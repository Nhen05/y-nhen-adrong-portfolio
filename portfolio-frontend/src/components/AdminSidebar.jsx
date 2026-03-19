import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSpeedometer2, BsBriefcase, BsAward, BsBoxArrowRight } from "react-icons/bs";
import { useState, useEffect } from "react";
import '../admin/AdminSidebar.css'
export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  // State kiểm tra có token hay không
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));

  // Theo dõi sự thay đổi của token (nếu có logout từ nơi khác)
  useEffect(() => {
    const checkToken = () => {
      setHasToken(!!localStorage.getItem("token"));
    };

    // Kiểm tra ngay lập tức
    checkToken();

    // Lắng nghe sự kiện storage (nếu logout từ tab khác)
    window.addEventListener("storage", checkToken);
    // Hoặc kiểm tra định kỳ (tùy chọn)
    const interval = setInterval(checkToken, 2000);

    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Nếu có lưu thêm thông tin khác
    // localStorage.removeItem("user");
    // localStorage.removeItem("role");

    // Chuyển hướng về trang login admin
    navigate("/admin/login");

    // Optional: reload để reset hoàn toàn state
    // window.location.href = "/admin/login";
  };

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        color: "#f1f5f9",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "2px 0 12px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1.5rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <BsSpeedometer2 size={28} style={{ color: "#3b82f6" }} />
          Admin Panel
        </h4>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0.75rem 0" }}>
        <Link
          to="/admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.5rem",
            color: "#f1f5f9",
            textDecoration: "none",
            transition: "all 0.2s ease",
            backgroundColor: isActive("/admin") ? "rgba(59,130,246,0.15)" : "transparent",
            borderLeft: isActive("/admin") ? "4px solid #3b82f6" : "4px solid transparent",
            fontWeight: isActive("/admin") ? 600 : 400,
          }}
          onMouseEnter={(e) => {
            if (!isActive("/admin")) {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive("/admin")) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          <BsSpeedometer2 size={22} style={{ opacity: 0.8 }} />
          Dashboard
        </Link>

        <Link
          to="/admin/projects"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.5rem",
            color: "#f1f5f9",
            textDecoration: "none",
            transition: "all 0.2s ease",
            backgroundColor: isActive("/admin/projects") ? "rgba(59,130,246,0.15)" : "transparent",
            borderLeft: isActive("/admin/projects") ? "4px solid #3b82f6" : "4px solid transparent",
            fontWeight: isActive("/admin/projects") ? 600 : 400,
          }}
          onMouseEnter={(e) => {
            if (!isActive("/admin/projects")) {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive("/admin/projects")) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          <BsBriefcase size={22} style={{ opacity: 0.8 }} />
          Projects
        </Link>

        <Link
          to="/admin/achievements"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.5rem",
            color: "#f1f5f9",
            textDecoration: "none",
            transition: "all 0.2s ease",
            backgroundColor: isActive("/admin/achievements") ? "rgba(59,130,246,0.15)" : "transparent",
            borderLeft: isActive("/admin/achievements") ? "4px solid #3b82f6" : "4px solid transparent",
            fontWeight: isActive("/admin/achievements") ? 600 : 400,
          }}
          onMouseEnter={(e) => {
            if (!isActive("/admin/achievements")) {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive("/admin/achievements")) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          <BsAward size={22} style={{ opacity: 0.8 }} />
          Achievements
        </Link>
      </nav>

      {/* Logout button - CHỈ HIỂN THỊ NẾU CÓ TOKEN */}
      {hasToken && (
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "auto",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              backgroundColor: "rgba(239,68,68,0.15)",
              color: "#ef4444",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.25)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.15)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
            }}
          >
            <BsBoxArrowRight size={20} />
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}