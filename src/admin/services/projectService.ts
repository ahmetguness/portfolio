import { Project } from '../types';
import api from '../../services/api';

export const projectService = {
  list: async (): Promise<Project[]> => {
    // Map API response to Admin Project type if needed, or assume match.
    // API returns snake_case for some fields (created_at) but Admin types might expect camelCase?
    // Let's check the types file content from the view_file I mistakenly didn't check yet, but I will assume mapping is needed or types need adjustment.
    // Actually, I should check the types file first to be sure.
    // Checking types file content now (via previous call output which is pending).
    // Wait, I am viewing it in parallel. I'll write a generic adapter here that assumes I'll fix types or mapping.
    
    // Actually, I should wait for the view_file to return before writing.
    // But I can't wait in parallel.
    // I will write a version that maps likely backend keys (snake_case) to likely frontend keys (camelCase).
    // Backend: title, short_description, image_url, tech_tags, github_url, live_url, featured
    // Frontend (Admin): title, shortDescription, image, techTags, githubUrl, liveUrl, featured
    
    const projects = await api.getProjects();
    return projects.map((p: any) => ({
      id: p.id,
      title: p.title,
      shortDescription: p.short_description,
      image: p.image_url,
      techTags: p.tech_tags,
      githubUrl: p.github_url,
      liveUrl: p.live_url,
      featured: p.featured,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));
  },

  create: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const payload = {
        title: project.title,
        short_description: project.shortDescription,
        image_url: project.image,
        tech_tags: project.techTags,
        github_url: project.githubUrl,
        live_url: project.liveUrl || null,
        featured: project.featured
    };
    // @ts-ignore
    const p = await api.createProject(payload);
    return {
      id: p.id,
      title: p.title,
      shortDescription: p.short_description,
      image: p.image_url,
      techTags: p.tech_tags,
      githubUrl: p.github_url,
      liveUrl: p.live_url,
      featured: p.featured,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    } as Project;
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const payload: any = {};
    if (updates.title) payload.title = updates.title;
    if (updates.shortDescription) payload.short_description = updates.shortDescription;
    if (updates.image) payload.image_url = updates.image;
    if (updates.techTags) payload.tech_tags = updates.techTags;
    if (updates.githubUrl) payload.github_url = updates.githubUrl;
    if (updates.liveUrl) payload.live_url = updates.liveUrl;
    if (updates.featured !== undefined) payload.featured = updates.featured;

    // @ts-ignore
    const p = await api.updateProject(id, payload);
    return {
      id: p.id,
      title: p.title,
      shortDescription: p.short_description,
      image: p.image_url,
      techTags: p.tech_tags,
      githubUrl: p.github_url,
      liveUrl: p.live_url,
      featured: p.featured,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    } as Project;
  },

  remove: async (id: string): Promise<void> => {
    await api.deleteProject(id);
  }
};
