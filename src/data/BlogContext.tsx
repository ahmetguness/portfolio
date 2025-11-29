import React, { createContext, useContext, useState, ReactNode } from 'react';
import { postsData } from './blog';
import { Post, BlogContextType } from '../types/blog';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(postsData);

  const addPost = (post: Post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const deletePost = (slug: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
  };

  const updatePost = (slug: string, updatedPost: Post) => {
    setPosts(prevPosts => prevPosts.map(post => post.slug === slug ? updatedPost : post));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
