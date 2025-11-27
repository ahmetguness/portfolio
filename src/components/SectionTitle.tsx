import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  number: string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ number, title }) => {
  return (
    <motion.div 
      className="flex items-center space-x-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-light-gray font-mono">
        <span className="text-accent-cyan text-2xl mr-2">{number}.</span>
        {title}
      </h2>
      <div className="flex-grow h-px bg-card-blue/50"></div>
    </motion.div>
  );
};

export default SectionTitle;
