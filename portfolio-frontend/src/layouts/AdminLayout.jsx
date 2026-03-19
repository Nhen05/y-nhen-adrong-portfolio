import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Cài react-icons nếu chưa có
import './AdminLayout.css'
export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin-layout-container">
      {/* Nút Toggle chỉ hiện trên Mobile */}
      <div className="admin-mobile-nav d-lg-none">
        <span className="fw-bold">Admin Panel</span>
        <button 
          className="btn text-light" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      <div className="d-flex shadow-sm">
        {/* Truyền state vào Sidebar để xử lý ẩn hiện */}
        <div className={`admin-sidebar-wrapper ${isSidebarOpen ? "show" : ""}`}>
           <AdminSidebar />
        </div>

        {/* Overlay để đóng sidebar khi bấm ra ngoài (chỉ hiện trên mobile) */}
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay d-lg-none" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-grow-1 p-3 p-md-4 bg-dark text-light min-vh-100 main-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}