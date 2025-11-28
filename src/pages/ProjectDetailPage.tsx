import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useProjects } from '../data/ProjectContext';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useProjects();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <motion.div
      className="py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/projects" className="font-mono text-accent-cyan hover:underline mb-8 inline-block">
        &larr; All Projects
      </Link>
      
      <h1 className="text-4xl font-bold text-light-gray mb-2">{project.title}</h1>
      
      <div className="flex items-center space-x-4 mb-8">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-mid-gray hover:text-accent-cyan transition-colors flex items-center space-x-2" aria-label="GitHub Link">
              <FiGithub size={20} /> <span>GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-mid-gray hover:text-accent-cyan transition-colors flex items-center space-x-2" aria-label="Live Demo Link">
              <FiExternalLink size={20} /> <span>Live Demo</span>
            </a>
          )}
      </div>

      <img src={project.image} alt={project.title} className="rounded-lg mb-8 w-full h-auto max-h-[400px] object-cover" />

      <div className="prose prose-invert prose-lg max-w-none text-mid-gray">
          <p className="lead">{project.description}</p>
          {project.longDescription.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-light-gray mb-4">Technologies Used:</h3>
        <ul className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
                <li key={tech} className="text-sm font-mono bg-accent-cyan/10 text-accent-cyan px-3 py-1 rounded-full">{tech}</li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
