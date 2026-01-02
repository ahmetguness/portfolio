import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdArticle, MdWork, MdHome, MdLogout } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const navItems = [
    { path: '/admin/dashboard', icon: <MdDashboard />, label: t('Admin.Dashboard') },
    { path: '/admin/blogs', icon: <MdArticle />, label: t('Admin.Blogs') },
    { path: '/admin/projects', icon: <MdWork />, label: t('Admin.Projects') },
    { path: '/admin/resume', icon: <MdArticle />, label: t('Navbar.Resume') },
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
        <NavLink
          to="/"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <MdHome />
          <span>{t('Admin.BackToHome')}</span>
        </NavLink>

        <button onClick={logout} className="sidebar-link logout-btn">
          <MdLogout />
          <span>{t('Admin.Logout')}</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
