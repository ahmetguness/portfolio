import config from '../../config';

export const authService = {
  login: async (password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        // backend hem cookie set ediyor hem token döndürüyor; token’ı da saklayalım
        localStorage.setItem('admin_logged_in', 'true');
        if (data?.token) localStorage.setItem('token', data.token);
        return true;
      }

      return false;
    } catch (e) {
      console.error('Login error:', e);
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch(`${config.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('token');
    }
  },

  isAuthenticated: (): boolean => {
    // Token varsa ve flag true ise authenticated say
    return (
      localStorage.getItem('admin_logged_in') === 'true' &&
      !!localStorage.getItem('token')
    );
  },
};
