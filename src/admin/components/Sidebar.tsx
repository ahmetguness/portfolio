import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdArticle, MdWork, MdHome, MdLogout } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/admin/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
    { path: '/admin/blogs', icon: <MdArticle />, label: 'Blogs' },
    { path: '/admin/projects', icon: <MdWork />, label: 'Projects' },
    { path: '/admin/home-content', icon: <MdHome />, label: 'Home Content' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button onClick={logout} className="sidebar-link logout-btn">
          <MdLogout />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
