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
      // Sort by date descending (newest first)
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.published_at || a.created_at || '').getTime();
        const dateB = new Date(b.published_at || b.created_at || '').getTime();
        return dateB - dateA;
      });
      setBlogs(sortedData);
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
            blogPhoto={blog.image_url || ""}
            blogName={blog.title}
            blogDesc={blog.short_description}
            blogLink={blog.medium_url}
            date={blog.published_at || blog.created_at}
          />
        ))}
        {blogs.length === 0 && <p style={{textAlign: 'center'}}>No blogs found.</p>}
      </div>
    </div>
  );
};

export default Blog;
