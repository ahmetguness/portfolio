import { Project } from '../types';

const STORAGE_KEY = 'admin_projects';

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Tindog',
    shortDescription: 'A Tinder-like landing page for dogs. Responsive design with Bootstrap.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80',
    githubUrl: 'https://github.com/ahmetguness/tindog',
    liveUrl: 'https://ahmetguness.github.io/tindog/',
    techTags: ['HTML', 'CSS', 'Bootstrap'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Space Tourism',
    shortDescription: 'Multi-page space tourism website built with React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80',
    githubUrl: 'https://github.com/ahmetguness',
    liveUrl: '',
    techTags: ['React', 'TypeScript', 'Tailwind'],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const getProjects = (): Project[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultProjects;
};

const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const projectService = {
  list: async (): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getProjects()), 500);
    });
  },

  create: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    return new Promise((resolve) => {
      const projects = getProjects();
      const newProject: Project = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      projects.push(newProject);
      saveProjects(projects);
      setTimeout(() => resolve(newProject), 500);
    });
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project> => {
    return new Promise((resolve, reject) => {
      const projects = getProjects();
      const index = projects.findIndex(p => p.id === id);
      if (index === -1) {
        reject(new Error('Project not found'));
        return;
      }
      projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
      saveProjects(projects);
      setTimeout(() => resolve(projects[index]), 500);
    });
  },

  remove: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      let projects = getProjects();
      projects = projects.filter(p => p.id !== id);
      saveProjects(projects);
      setTimeout(() => resolve(), 500);
    });
  }
};
