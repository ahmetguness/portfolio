import React from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../data/ProjectContext';
import ProjectCard from '../components/ProjectCard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const ProjectsPage = () => {
  const { projects } = useProjects();

  return (
    <motion.div 
        className="py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-light-gray mb-4">All Projects</h1>
      <p className="text-mid-gray mb-12">A collection of things I've built.</p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectsPage;
