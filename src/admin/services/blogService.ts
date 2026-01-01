import { BlogPost } from '../types';
import api from '../../services/api';

export const blogService = {
  list: async (): Promise<BlogPost[]> => {
    const blogs = await api.getBlogs();
    return blogs.map((b: any) => ({
      id: b.id,
      title: b.title,
      shortDescription: b.short_description,
      image: b.image_url,
      mediumUrl: b.medium_url,
      publishedAt: b.published_at,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    }));
  },

  get: async (id: string): Promise<BlogPost | undefined> => {
      // API doesn't have getById yet in this plan? 
      // The plan only had List. But I can filter list or add endpoint.
      // Since list is small, finding in list is fine for now, or just return undefined if strict.
      // Ref: `api.ts` only has `getBlogs`.
      // I will fetch all and find.
      // Optimization: Add getById endpoint later.
      const blogs = await blogService.list();
      return blogs.find(b => b.id === id);
  },

  create: async (blog: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
    const payload = {
        title: blog.title,
        short_description: blog.shortDescription,
        image_url: blog.image,
        medium_url: blog.mediumUrl,
        published_at: blog.publishedAt
    };
    // @ts-ignore
    const b = await api.createBlog(payload);
    return {
      id: b.id,
      title: b.title,
      shortDescription: b.short_description,
      image: b.image_url,
      mediumUrl: b.medium_url,
      publishedAt: b.published_at,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    } as BlogPost;
  },

  update: async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
    const payload: any = {};
    if (updates.title) payload.title = updates.title;
    if (updates.shortDescription) payload.short_description = updates.shortDescription;
    if (updates.image) payload.image_url = updates.image;
    if (updates.mediumUrl) payload.medium_url = updates.mediumUrl;
    if (updates.publishedAt) payload.published_at = updates.publishedAt;

    // @ts-ignore
    const b = await api.updateBlog(id, payload);
    return {
      id: b.id,
      title: b.title,
      shortDescription: b.short_description,
      image: b.image_url,
      mediumUrl: b.medium_url,
      publishedAt: b.published_at,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    } as BlogPost;
  },

  remove: async (id: string): Promise<void> => {
    await api.deleteBlog(id);
  }
};
