export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

export interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (slug: string) => void;
  updateProject: (slug: string, project: Project) => void;
}

export interface ProjectsSectionContent {
  title: string;
  buttonText: string;
}

export interface ProjectsSectionContextType {
  projectsSectionContent: ProjectsSectionContent;
  setProjectsSectionContent: (content: ProjectsSectionContent) => void;
}
