import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          <button type="submit" className="admin-btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#718096', fontSize: '0.9rem' }}>
          Hint: Password is <b>admin123</b>
        </p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
             <a href="/" style={{ color: '#9067C6', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                &larr; Back to Home
             </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
