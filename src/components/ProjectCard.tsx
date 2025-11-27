import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { slug, title, description, techStack, githubUrl, liveUrl, image } = project;

  return (
    <motion.div
      variants={cardVariants}
      className="bg-card-blue rounded-md shadow-lg p-6 flex flex-col h-full
                 transition-transform duration-300"
      whileHover={{ 
        y: -8,
        boxShadow: "0 10px 15px -3px rgba(100, 255, 218, 0.1), 0 4px 6px -2px rgba(100, 255, 218, 0.05)"
      }}
    >
      <Link to={`/projects/${slug}`} className="mb-4 block">
        <img src={image} alt={title} className="rounded-md object-cover w-full h-48" />
      </Link>
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-light-gray group-hover:text-accent-cyan transition-colors">
          <Link to={`/projects/${slug}`}>{title}</Link>
        </h3>
        <div className="flex space-x-4">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-mid-gray hover:text-accent-cyan transition-colors" aria-label="GitHub Link">
              <FiGithub size={22} />
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-mid-gray hover:text-accent-cyan transition-colors" aria-label="Live Demo Link">
              <FiExternalLink size={22} />
            </a>
          )}
        </div>
      </header>
      
      <p className="text-mid-gray flex-grow mb-4">
        {description}
      </p>

      <footer className="mt-auto">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-mono text-mid-gray">
          {techStack.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </footer>
    </motion.div>
  );
};

export default ProjectCard;
