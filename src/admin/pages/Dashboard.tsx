import React, { useEffect, useState } from 'react';
import { blogService } from '../services/blogService';
import { projectService } from '../services/projectService';

const Dashboard = () => {
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
        <h2>Dashboard</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div className="admin-card">
          <h3>Total Blogs</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9067C6' }}>{stats.blogs}</p>
        </div>
        <div className="admin-card">
          <h3>Total Projects</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9067C6' }}>{stats.projects}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
