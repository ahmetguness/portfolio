import React, { createContext, useContext, useState, ReactNode } from 'react';
import { projectsData } from './projects';
import { Project, ProjectContextType } from '../types/project';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  const addProject = (project: Project) => {
    setProjects(prevProjects => [project, ...prevProjects]);
  };

  const deleteProject = (slug: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.slug !== slug));
  };

  const updateProject = (slug: string, updatedProject: Project) => {
    setProjects(prevProjects => prevProjects.map(project => project.slug === slug ? updatedProject : project));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider.');
  }
  return context;
};
