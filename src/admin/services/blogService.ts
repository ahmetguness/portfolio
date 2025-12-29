import { BlogPost } from '../types';

const STORAGE_KEY = 'admin_blogs';

const defaultBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'My Journey into Web Development',
    shortDescription: 'How I started my coding journey from zero to hero, learning React and TypeScript along the way.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
    mediumUrl: 'https://medium.com/@ahmetgunes',
    publishedAt: '2023-01-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Understanding React Hooks',
    shortDescription: 'A deep dive into useState, useEffect, and custom hooks for better state management.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80',
    mediumUrl: 'https://medium.com/@ahmetgunes',
    publishedAt: '2023-03-22',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const getBlogs = (): BlogPost[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultBlogs;
};

const saveBlogs = (blogs: BlogPost[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
};

export const blogService = {
  list: async (): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getBlogs()), 500);
    });
  },

  get: async (id: string): Promise<BlogPost | undefined> => {
    return new Promise((resolve) => {
      const blogs = getBlogs();
      setTimeout(() => resolve(blogs.find(b => b.id === id)), 300);
    });
  },

  create: async (blog: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
    return new Promise((resolve) => {
      const blogs = getBlogs();
      const newBlog: BlogPost = {
        ...blog,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      blogs.push(newBlog);
      saveBlogs(blogs);
      setTimeout(() => resolve(newBlog), 500);
    });
  },

  update: async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
    return new Promise((resolve, reject) => {
      const blogs = getBlogs();
      const index = blogs.findIndex(b => b.id === id);
      if (index === -1) {
        reject(new Error('Blog not found'));
        return;
      }
      blogs[index] = { ...blogs[index], ...updates, updatedAt: new Date().toISOString() };
      saveBlogs(blogs);
      setTimeout(() => resolve(blogs[index]), 500);
    });
  },

  remove: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      let blogs = getBlogs();
      blogs = blogs.filter(b => b.id !== id);
      saveBlogs(blogs);
      setTimeout(() => resolve(), 500);
    });
  }
};
