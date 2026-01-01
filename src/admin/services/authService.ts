export const authService = {
  login: (password: string): boolean => {
    if (password === 'admin123') {
      try {
        localStorage.setItem('admin_logged_in', 'true');
        return true;
      } catch (e) {
        console.error("Local storage error:", e);
        return false;
      }
    }
    return false;
  },

  logout: () => {
    try {
      localStorage.removeItem('admin_logged_in');
    } catch (e) {
      console.error("Local storage error:", e);
    }
  },

  isAuthenticated: (): boolean => {
    try {
      return localStorage.getItem('admin_logged_in') === 'true';
    } catch (e) {
      console.error("Local storage error:", e);
      return false;
    }
  }
};
