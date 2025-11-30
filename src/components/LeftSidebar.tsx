import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks as allSocials } from '../data/socials';
import { useContactSection } from '../data/ContactSectionContext';

const LeftSidebar = () => {
    const { contactSectionContent } = useContactSection();
    const socialLinks = allSocials.filter(link => ['GitHub', 'LinkedIn', 'Email'].includes(link.name)).map(link => {
        if (link.name === 'GitHub') {
            return { ...link, url: contactSectionContent.githubUrl };
        }
        if (link.name === 'LinkedIn') {
            return { ...link, url: contactSectionContent.linkedinUrl };
        }
        if (link.name === "Email") {
            return { ...link, url: `mailto:${contactSectionContent.email}` };
        }
        return link;
    });

    return (
        <motion.div 
            className="hidden md:flex flex-col items-center fixed bottom-0 left-12 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <div className="flex flex-col items-center space-y-6">
                {socialLinks.map((link) => (
                    <motion.a 
                        key={link.url} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={link.name}
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
