import React, { useEffect, useState } from 'react';
import { blogService } from '../services/blogService';
import { projectService } from '../services/projectService';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ blogs: 0, projects: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.list();
      const projects = await projectService.list();
      setStats({ blogs: blogs.length, projects: projects.length });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h2>{t('Admin.Dashboard')}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div className="admin-card">
          <h3>{t('Admin.TotalBlogs')}</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9067C6' }}>{stats.blogs}</p>
        </div>
        <div className="admin-card">
          <h3>{t('Admin.TotalProjects')}</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9067C6' }}>{stats.projects}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
