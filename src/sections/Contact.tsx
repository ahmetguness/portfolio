import React from 'react';
import { motion } from 'framer-motion';

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
        04. What's Next?
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold text-light-gray mb-4"
      >
        Get In Touch
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="max-w-2xl mx-auto text-mid-gray mb-10"
      >
        Although I’m not currently looking for any new opportunities, my inbox is always open.
        Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </motion.p>
      <motion.div variants={itemVariants}>
        <a
          href="mailto:placeholder@example.com"
          className="font-mono text-lg text-accent-cyan border border-accent-cyan rounded px-8 py-5
                     hover:bg-accent-cyan/10 transition-colors duration-300"
        >
          Say Hello
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
