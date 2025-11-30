import React from 'react';
import { motion } from 'framer-motion';
import { useContactSection } from '../data/ContactSectionContext';

const RightSidebar = () => {
    const { contactSectionContent } = useContactSection();
    return (
        <motion.div 
            className="hidden md:flex flex-col items-center fixed bottom-0 right-12 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <motion.a 
                href={`mailto:${contactSectionContent.email}`}
                className="font-mono text-sm text-mid-gray hover:text-accent-cyan [writing-mode:vertical-rl] tracking-widest"
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                {contactSectionContent.email}
            </motion.a>
            <div className="w-px h-24 bg-mid-gray mt-6"></div>
        </motion.div>
    );
};

export default RightSidebar;