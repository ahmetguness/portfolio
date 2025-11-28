import React from 'react';
import { motion } from 'framer-motion';
import { useHero } from '../data/HeroContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Hero = () => {
  const { heroContent } = useHero();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col justify-center"
    >
      <motion.p variants={itemVariants} className="text-accent-cyan font-mono text-lg mb-4">
        {heroContent.line1}
      </motion.p>
      
      <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold text-light-gray mb-2">
        {heroContent.name}
      </motion.h1>
      
      <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-bold text-mid-gray mb-8">
        {heroContent.line2}
      </motion.h2>
      
      <motion.p variants={itemVariants} className="max-w-xl text-mid-gray mb-10">
        {heroContent.description}
      </motion.p>
      
      <motion.div variants={itemVariants} className="flex space-x-4">
        <a
          href="#contact"
          className="font-mono text-accent-cyan border border-accent-cyan rounded px-8 py-4
                     hover:bg-accent-cyan/10 transition-colors duration-300"
        >
          {heroContent.buttonText}
        </a>
        <a
          href="/cv.pdf"
          download
          className="font-mono text-accent-cyan border border-accent-cyan rounded px-8 py-4
                     hover:bg-accent-cyan/10 transition-colors duration-300"
        >
          {heroContent.cvButtonText}
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
