import React from 'react';
import BlogBox from './BlogBox';
import TindogImage from '../images/TindogImage.png';
import RogfreeImage from '../images/RogfreeImage.png';
import WigglesImage from '../images/WigglesImage.png';

const Blog = () => {
  const blogs = [
    {
      blogPhoto: TindogImage,
      blogName: 'My First Blog Post',
      blogDesc: 'This is a short description of my first blog post. I talk about my journey into web development.',
      blogLink: 'https://medium.com/@ahmetgunes'
    },
    {
      blogPhoto: RogfreeImage,
      blogName: 'Learning React',
      blogDesc: 'I share my experience of learning React and building my first React application.',
      blogLink: 'https://medium.com/@ahmetgunes'
    },
    {
      blogPhoto: WigglesImage,
      blogName: 'The MERN Stack',
      blogDesc: 'An overview of the MERN stack and why I chose it for my projects.',
      blogLink: 'https://medium.com/@ahmetgunes'
    }
  ];

  return (
    <div className='BlogPage'>
      <h1 className='BlogHeading'>Blogs</h1>
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
