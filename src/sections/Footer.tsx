import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const socialLinks = [
  { icon: <FiGithub />, url: '#' },
  { icon: <FiLinkedin />, url: '#' },
  { icon: <FiTwitter />, url: '#' },
];

const Footer = () => {
  return (
    <motion.footer 
      className="w-full py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        <div className="flex space-x-6 mb-4 md:hidden">
            {socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-2xl text-mid-gray hover:text-accent-cyan transform hover:-translate-y-1 transition-all duration-300">
                    {link.icon}
                </a>
            ))}
        </div>
        <p className="font-mono text-sm text-mid-gray text-center">
          Designed & Built by Ahmet
        </p>
        <p className="font-mono text-xs text-card-blue mt-1">
          Inspired by modern sci-fi aesthetics.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
