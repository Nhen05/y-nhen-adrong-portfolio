import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { AiOutlineHome, AiOutlineUser, AiOutlineProject, AiOutlineTrophy, AiOutlineMail, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import ThemeToggle from './ThemeToggle';
import './Sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", to: "/", icon: <AiOutlineHome /> },
    { name: "About", to: "/about", icon: <AiOutlineUser /> },
    { name: "Projects", to: "/projects", icon: <AiOutlineProject /> },
    { name: "Dashboard", to: "/dashboard", icon: <AiOutlineHome /> },
    { name: "Achievements", to: "/achievements", icon: <AiOutlineTrophy /> },
    { name: "Contact", to: "/contact", icon: <AiOutlineMail /> },
  ];

  return (
    <div className="sidebar-wrapper">
      {/* Nút Toggle chỉ hiển thị trên Mobile/Tablet (< 992px) */}
      {/* SỬA LẠI DÒNG NÀY */}
      <div className="d-lg-none mobile-header d-flex justify-content-between align-items-center p-3">
        <span className="fw-bold fs-5">Y Nhen Adrong</span>
        <button className="btn btn-outline-primary border-0" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
        </button>
      </div>

      {/* Nội dung Sidebar - Tự động ẩn/hiện dựa trên state 'isOpen' ở mobile */}
      <div className={`sidebar p-4 ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header text-center">
          <div className="sidebar-header-avatar mx-auto">
            <img src="avatar.jpg" alt="avatar" className="rounded-circle w-100 h-100 border border-3" />
          </div>
          <div className="sidebar-header-info">
            <h4 className="mb-1 mt-2 fw-800">
              Y Nhen Adrong
              <MdVerified className="text-primary ms-2" title="Verified" />
            </h4>
            <p className="sidebar-header-username text-muted">@nhendeveloper</p>
          </div>
          <div className="d-flex justify-content-center my-3">
            <ThemeToggle />
          </div>
        </div>

        <hr />

        <nav className="nav flex-column">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `nav-item-link text-decoration-none fs-5 d-flex align-items-center py-2 px-3 mb-2 mt-2 ${isActive ? 'nav-item-active' : 'text-muted'}`
              }
              to={item.to}
              end={item.to === "/"}
              onClick={() => setIsOpen(false)} // Đóng sidebar khi chọn item ở mobile
            >
              <span className="nav-icon-left">{item.icon}</span>
              <span className="nav-text flex-grow-1 ms-3">{item.name}</span>
              <HiChevronRight className="nav-icon-arrow" />
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}