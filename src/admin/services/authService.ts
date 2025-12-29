export const authService = {
  login: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true');
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('admin_logged_in');
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem('admin_logged_in') === 'true';
  }
};
