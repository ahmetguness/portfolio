import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col justify-center"
    >
      <motion.p variants={itemVariants} className="text-accent-cyan font-mono text-lg mb-4">
        Hi, my name is
      </motion.p>
      
      <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold text-light-gray mb-2">
        Ahmet.
      </motion.h1>
      
      <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-bold text-mid-gray mb-8">
        I build things for the web.
      </motion.h2>
      
      <motion.p variants={itemVariants} className="max-w-xl text-mid-gray mb-10">
        I'm a frontend engineer specializing in building (and occasionally designing)
        exceptional digital experiences. Currently, I’m focused on building accessible,
        human-centered products.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <a
          href="#contact"
          className="font-mono text-accent-cyan border border-accent-cyan rounded px-8 py-4
                     hover:bg-accent-cyan/10 transition-colors duration-300"
        >
          Get In Touch
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
