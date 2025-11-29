import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Project } from '../types/project';

/**
 * Props for the IconLink component.
 */
interface IconLinkProps {
  href: string;
  icon: React.ReactElement;
  ariaLabel: string;
}

/**
 * A reusable component for rendering an icon link.
 * It handles external link attributes and hover effects.
 */
const IconLink: React.FC<IconLinkProps> = ({ href, icon, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-mid-gray transition-colors hover:text-accent-cyan"
  >
    {icon}
  </a>
);

/**
 * Props for the ProjectCard component.
 * It uses the shared 'Project' type, promoting type consistency.
 */
interface ProjectCardProps {
  project: Project;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/**
 * A card component to display a summary of a project.
 * It features hover animations and links to the project page, GitHub, and live demo.
 * Follows a clean structure by using sub-components like IconLink.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { slug, title, description, techStack, githubUrl, liveUrl, image } = project;

  return (
    <motion.div
      variants={cardVariants}
      className="group flex h-full flex-col rounded-md bg-card-blue p-6 shadow-lg transition-transform duration-300"
      whileHover={{
        y: -8,
        boxShadow: '0 10px 15px -3px rgba(100, 255, 218, 0.1), 0 4px 6px -2px rgba(100, 255, 218, 0.05)',
      }}
    >
      <Link to={`/projects/${slug}`} className="mb-4 block">
        <img src={image} alt={title} className="h-48 w-full rounded-md object-cover" />
      </Link>
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-light-gray transition-colors group-hover:text-accent-cyan">
          <Link to={`/projects/${slug}`}>{title}</Link>
        </h3>
        <div className="flex space-x-4">
          {githubUrl && (
            <IconLink href={githubUrl} icon={<FiGithub size={22} />} ariaLabel="GitHub Link" />
          )}
          {liveUrl && (
            <IconLink href={liveUrl} icon={<FiExternalLink size={22} />} ariaLabel="Live Demo Link" />
          )}
        </div>
      </header>

      <p className="mb-4 flex-grow text-mid-gray">{description}</p>

      <footer className="mt-auto">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-mid-gray">
          {techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </footer>
    </motion.div>
  );
};

export default ProjectCard;