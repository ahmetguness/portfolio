import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectsSectionContent {
  title: string;
  buttonText: string;
}

interface ProjectsSectionContextType {
  projectsSectionContent: ProjectsSectionContent;
  setProjectsSectionContent: (content: ProjectsSectionContent) => void;
}

const projectsSectionInitialState: ProjectsSectionContent = {
  title: "Some Things I've Built",
  buttonText: 'View All Projects',
};

const ProjectsSectionContext = createContext<ProjectsSectionContextType | undefined>(undefined);

export const ProjectsSectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectsSectionContent, setProjectsSectionContent] = useState<ProjectsSectionContent>(projectsSectionInitialState);

  return (
    <ProjectsSectionContext.Provider value={{ projectsSectionContent, setProjectsSectionContent }}>
      {children}
    </ProjectsSectionContext.Provider>
  );
};

export const useProjectsSection = () => {
  const context = useContext(ProjectsSectionContext);
  if (context === undefined) {
    throw new Error('useProjectsSection must be used within a ProjectsSectionProvider');
  }
  return context;
};
