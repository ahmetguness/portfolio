
import config from '../config';

export interface Project {
  id?: string;
  title: string;
  short_description: string;
  image_url?: string;
  tech_tags: string[];
  github_url: string;
  live_url?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Blog {
    id?: string;
    title: string;
    short_description: string;
    image_url?: string;
    medium_url: string;
    published_at: string;
    created_at?: string;
    updated_at?: string;
}

const API_BASE_URL = config.API_BASE_URL;

const getHeaders = () => {
    const headers: any = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.warn('No token found in localStorage');
    }
    return headers;
};

const api = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    const res = await fetch(`${API_BASE_URL}/projects`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    const res = await fetch(`${API_BASE_URL}/projects/featured`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch featured projects');
    return res.json();
  },

  createProject: async (project: Project): Promise<Project> => {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(project),
      credentials: 'include',
    });
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('admin_logged_in');
            window.location.href = '/admin/login'; // Force re-login
        }
        const txt = await res.text();
        console.error('Create Project Error:', res.status, txt);
        throw new Error(`Failed to create project: ${res.status} ${txt}`);
    }
    return res.json();
  },
  
  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(project),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  deleteProject: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    const res = await fetch(`${API_BASE_URL}/blogs`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  },

  createBlog: async (blog: Blog): Promise<Blog> => {
      const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(blog),
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Create Blog Error:', res.status, err);
        throw new Error(err.error || `Failed to create blog: ${res.status}`);
      }
      return res.json();
  },

  updateBlog: async (id: string, blog: Partial<Blog>): Promise<Blog> => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(blog),
      credentials: 'include',
    });
    
    if (res.status === 401) {
        console.warn('Unauthorized! clearing session and redirecting...');
        localStorage.removeItem('token');
        localStorage.removeItem('admin_logged_in');
        // Attempt backend logout to clear cookie
        await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
        window.location.href = '/admin/login';
        throw new Error('Unauthorized');
    }

    if (!res.ok) throw new Error('Failed to update blog');
    return res.json();
  },

  deleteBlog: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete blog');
  },
  
  // Auth Check
  checkSession: async (): Promise<{ user: any } | null> => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, { credentials: 'include' });
        if (!res.ok) {
            // If token is invalid/expired (401), clean up client state so we don't keep sending it.
            if (res.status === 401) {
                console.warn('Session expired. Cleaning up...');
                localStorage.removeItem('token');
                localStorage.removeItem('admin_logged_in');
                // Attempt to clear cookie as well
                await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
            }
            return null;
        }
        return res.json();
      } catch {
          return null;
      }
  }
};

export default api;
