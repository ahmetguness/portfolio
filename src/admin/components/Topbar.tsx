import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MdPerson } from 'react-icons/md';

const Topbar = () => {
  const { logout } = useAuth();

  return (
    <div className="admin-topbar">
      <div className="topbar-right">
        <div className="admin-profile">
          <MdPerson />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
