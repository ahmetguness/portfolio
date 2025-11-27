import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects'; // Import centralized data
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

const Projects = () => {
  // Show only the first 3 projects on the homepage
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="min-h-screen py-24">
      <SectionTitle number="02" title="Some Things I've Built" />
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/projects"
          className="font-mono text-accent-cyan border border-accent-cyan rounded px-8 py-4
                     hover:bg-accent-cyan/10 transition-colors duration-300"
        >
          View All Projects
        </Link>
      </motion.div>
    </div>
  );
};

export default Projects;
