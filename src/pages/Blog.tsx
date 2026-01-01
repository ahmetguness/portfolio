import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BlogBox from '../components/BlogBox';
import api, { Blog as BlogType } from '../services/api';

const Blog = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await api.getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to load blogs", error);
    }
  };

  return (
    <div className='BlogPage'>
      <h1 className='BlogHeading'>{t('Blog.Heading')}</h1>
      <div className='project'>
        {blogs.map((blog) => (
          <BlogBox
            key={blog.id}
            blogPhoto={blog.image_url || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop"}
            blogName={blog.title}
            blogDesc={blog.short_description}
            blogLink={blog.medium_url}
          />
        ))}
        {blogs.length === 0 && <p style={{textAlign: 'center'}}>No blogs found.</p>}
      </div>
    </div>
  );
};

export default Blog;
