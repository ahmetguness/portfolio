import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <motion.div
      className="min-h-[60vh] flex flex-col justify-center items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-accent-cyan text-2xl mb-4">404</p>
      <h1 className="text-5xl font-bold text-light-gray mb-4">Page Not Found</h1>
      <p className="text-mid-gray mb-8 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="font-mono text-accent-cyan border border-accent-cyan rounded px-8 py-4
                   hover:bg-accent-cyan/10 transition-colors duration-300"
      >
        Go Home
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
