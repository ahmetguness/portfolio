import React from 'react';
import { motion } from 'framer-motion';
import { useBlog } from '../data/BlogContext';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

const BlogPage = () => {
    const { posts } = useBlog();

    return (
        <motion.div 
            className="py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl font-bold text-light-gray mb-4">Writing & Articles</h1>
            <p className="text-mid-gray mb-12">Thoughts on technology, design, and more.</p>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {posts.map((post) => (
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
                                <div className="md:col-span-6">
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
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default BlogPage;
