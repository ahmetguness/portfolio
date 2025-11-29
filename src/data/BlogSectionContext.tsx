import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BlogSectionContent, BlogSectionContextType } from '../types/blog';

const blogSectionInitialState: BlogSectionContent = {
  title: "Writing & Articles",
  buttonText: 'View All Posts',
};

const BlogSectionContext = createContext<BlogSectionContextType | undefined>(undefined);

export const BlogSectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogSectionContent, setBlogSectionContent] = useState<BlogSectionContent>(blogSectionInitialState);

  return (
    <BlogSectionContext.Provider value={{ blogSectionContent, setBlogSectionContent }}>
      {children}
    </BlogSectionContext.Provider>
  );
};

export const useBlogSection = () => {
  const context = useContext(BlogSectionContext);
  if (context === undefined) {
    throw new Error('useBlogSection must be used within a BlogSectionProvider');
  }
  return context;
};
