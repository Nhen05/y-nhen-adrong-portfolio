import React, { useState } from 'react';
import { FiSun, FiMoon } from "react-icons/fi";
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

const toggleTheme = () => {
  const newStatus = !isDark;
  setIsDark(newStatus);
  
  if (newStatus) { // Dark Mode
    document.body.classList.add('is-dark');
    document.body.classList.remove('is-light');
  } else { // Light Mode
    document.body.classList.add('is-light');
    document.body.classList.remove('is-dark');
  }
};

  return (
    <div className={`theme-switch ${isDark ? 'dark' : 'light'}`} onClick={toggleTheme}>
      {/* 2 Icon này đứng yên ở nền */}
      <div className="icon-bg">
        <FiSun className="sun-icon-bg" />
        <FiMoon className="moon-icon-bg" />
      </div>
      
      {/* Nút tròn này sẽ trượt đè lên trên */}
      <div className="switch-handle">
        {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
      </div>
    </div>
  );
};

export default ThemeToggle;