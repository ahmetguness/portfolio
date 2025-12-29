import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Lottie from "lottie-react";
import nightsky from "../../assets/lottie/night-sky.json";
import '../admin.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Background Effects */}
      <Lottie className="bg" animationData={nightsky} loop={true} style={{ position: 'fixed', zIndex: 0, bottom: 0, opacity: 0.5, pointerEvents: 'none' }} />
      <Lottie className="bgtemp" animationData={nightsky} loop={true} style={{ position: 'fixed', zIndex: 0, top: 0, opacity: 0.5, pointerEvents: 'none' }} />

      <Sidebar />
      <div className="admin-main" style={{ zIndex: 1, position: 'relative' }}>
        <Topbar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
