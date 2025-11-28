import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/ahmetguness' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/ahmet-g%C3%BCne%C5%9F-52381b27a/' },
    { icon: <FiMail />, url: 'mailto:ahmetgunes.ceng@gmail.com' },
];

const LeftSidebar = () => {
    return (
        <motion.div 
            className="hidden md:flex flex-col items-center fixed bottom-0 left-12 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <div className="flex flex-col items-center space-y-6">
                {socialLinks.map((link, index) => (
                    <motion.a 
                        key={index} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-2xl text-mid-gray hover:text-accent-cyan"
                        whileHover={{ y: -3, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {link.icon}
                    </motion.a>
                ))}
            </div>
            <div className="w-px h-24 bg-mid-gray mt-6"></div>
        </motion.div>
    );
};

export default LeftSidebar;
