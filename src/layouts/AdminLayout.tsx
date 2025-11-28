import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  return (
    <div className="bg-space-dark min-h-screen text-light-gray">
      <header className="bg-card-blue shadow-md">
        <div className="container mx-auto px-6 sm:px-12 md:px-24 lg:px-48 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-accent-cyan">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container mx-auto px-6 sm:px-12 md:px-24 lg:px-48 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
