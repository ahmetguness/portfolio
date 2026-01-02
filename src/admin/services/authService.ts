

import config from '../../config';

export const authService = {
  login: async (password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include' 
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('admin_logged_in', 'true');
        if (data.token) localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login error:", e);
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch(`${config.API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('token');
    } catch (e) {
      console.error("Logout error:", e);
    }
  },

  isAuthenticated: (): boolean => {
    // Strictly require token check to force new login flow
    return localStorage.getItem('admin_logged_in') === 'true' && !!localStorage.getItem('token');
  }
};
