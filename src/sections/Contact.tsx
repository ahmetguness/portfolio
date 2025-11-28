import React from 'react';
import { motion } from 'framer-motion';
import { useContactSection } from '../data/ContactSectionContext';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.7
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  const { contactSectionContent } = useContactSection();

  return (
    <motion.div
      id="contact"
      className="min-h-screen py-24 flex flex-col justify-center items-center text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p variants={itemVariants} className="font-mono text-accent-cyan mb-4">
        {contactSectionContent.preTitle}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold text-light-gray mb-4"
      >
        {contactSectionContent.title}
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="max-w-2xl mx-auto text-mid-gray mb-10"
      >
        {contactSectionContent.paragraph}
      </motion.p>
      <motion.div variants={itemVariants}>
        <a
          href={`mailto:${contactSectionContent.email}`}
          className="font-mono text-lg text-accent-cyan border border-accent-cyan rounded px-8 py-5
                     hover:bg-accent-cyan/10 transition-colors duration-300"
        >
          {contactSectionContent.buttonText}
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
