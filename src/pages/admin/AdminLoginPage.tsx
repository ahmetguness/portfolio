import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin') {
      // In a real app, you'd use a more secure auth method
      // and store the session state.
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-card-blue rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-light-gray">Admin Login</h1>
        <div className="mb-4">
          <label className="block text-mid-gray text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border border-space-dark bg-space-dark text-light-gray rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogin}
            className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
