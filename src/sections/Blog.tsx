import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { FiArrowRight } from 'react-icons/fi';
import { useBlog } from '../data/BlogContext';
import { useBlogSection } from '../data/BlogSectionContext';
import { Link } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

const Blog = () => {
  const { posts } = useBlog();
  const { blogSectionContent } = useBlogSection();
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen py-24">
      <SectionTitle number="03" title={blogSectionContent.title} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {featuredPosts.map((post) => (
          <motion.div
            key={post.slug}
            variants={itemVariants}
            whileHover="hover"
            className="block group"
          >
            <Link to={`/blog/${post.slug}`} className="block py-6 border-b-2 border-card-blue/50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-2">
                    <img src={post.image} alt={post.title} className="rounded-md object-cover w-full h-full" />
                </div>
                <div className="md:col-span-2">
                    <p className="font-mono text-sm text-mid-gray">{post.date}</p>
                </div>
                <div className="md:col-span-5">
                    <h3 className="text-xl font-bold text-light-gray group-hover:text-accent-cyan transition-colors">
                    {post.title}
                    </h3>
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono bg-accent-cyan/10 text-accent-cyan px-2 py-1 rounded-full">
                        {tag}
                    </span>
                    ))}
                </div>
                <div className="hidden md:flex md:col-span-1 justify-end">
                    <motion.div
                        variants={{ hover: { x: 5, opacity: 1 }, initial: { opacity: 0 } }}
                        transition={{ duration: 0.3 }}
                    >
                        <FiArrowRight className="text-accent-cyan text-2xl" />
                    </motion.div>
                </div>
                </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link
          to="/blog"
          className="font-mono text-accent-cyan border border-accent-cyan rounded px-8 py-4
                     hover:bg-accent-cyan/10 transition-colors duration-300"
        >
          {blogSectionContent.buttonText}
        </Link>
      </motion.div>
    </div>
  );
};

export default Blog;
