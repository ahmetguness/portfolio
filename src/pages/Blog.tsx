import React from 'react';
import { useTranslation } from 'react-i18next';
import BlogBox from '../components/BlogBox';
import TindogImage from '../assets/images/TindogImage.png';
import RogfreeImage from '../assets/images/RogfreeImage.png';
import WigglesImage from '../assets/images/WigglesImage.png';

const Blog = () => {
  const { t } = useTranslation();
  
  const blogs = [
    {
      blogPhoto: TindogImage,
      blogName: t('Blog.Post1Name'),
      blogDesc: t('Blog.Post1Desc'),
      blogLink: 'https://medium.com/@ahmetgunes'
    },
    {
      blogPhoto: RogfreeImage,
      blogName: t('Blog.Post2Name'),
      blogDesc: t('Blog.Post2Desc'),
      blogLink: 'https://medium.com/@ahmetgunes'
    },
    {
      blogPhoto: WigglesImage,
      blogName: t('Blog.Post3Name'),
      blogDesc: t('Blog.Post3Desc'),
      blogLink: 'https://medium.com/@ahmetgunes'
    }
  ];

  return (
    <div className='BlogPage'>
      <h1 className='BlogHeading'>{t('Blog.Heading')}</h1>
      <div className='project'>
        {blogs.map((blog, index) => (
          <BlogBox
            key={index}
            blogPhoto={blog.blogPhoto}
            blogName={blog.blogName}
            blogDesc={blog.blogDesc}
            blogLink={blog.blogLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
