import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { useAbout } from '../data/AboutContext';

const technologies = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'Node.js',
  'Tailwind CSS',
  'Framer Motion',
];

const About = () => {
  const { aboutText } = useAbout();
  const paragraphs = aboutText.split('\n\n');

  return (
    <motion.div 
      className="min-h-screen py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle number="01" title="About Me" />
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
        <motion.div 
          className="md:col-span-3 space-y-4 text-mid-gray text-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p>Here are a few technologies I’ve been working with recently:</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-sm">
            {technologies.map((tech) => (
              <li key={tech} className="relative pl-5">
                <span className="absolute left-0 text-accent-cyan">▹</span>
                {tech}
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          className="md:col-span-2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 relative group">
            <div className="absolute inset-0 bg-accent-cyan/10 border-2 border-accent-cyan rounded-md z-0 transform group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>
            <div className="absolute inset-0 bg-space-dark rounded-md z-10 overflow-hidden">
              <img 
                src="/src/assets/dummy_image.svg" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
