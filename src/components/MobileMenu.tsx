import React from 'react';
import { motion } from 'framer-motion';
import { CgClose } from "react-icons/cg";
import { Link } from 'react-router-dom';

const navItems = [
  { name: "About", path: "/#about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/#contact" },
];

const containerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren"
    }
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-space-dark z-50 flex flex-col items-center justify-center"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-8 right-6 text-4xl text-mid-gray hover:text-accent-cyan transition-colors"
        aria-label="Close menu"
      >
        <CgClose />
      </button>

      <ul className="flex flex-col items-center space-y-8">
        {navItems.map((item, index) => (
          <motion.li
            key={item.name}
            variants={itemVariants}
          >
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-3xl text-light-gray hover:text-accent-cyan transition-colors duration-300 font-mono text-center"
            >
              <span className="text-accent-cyan"></span> {item.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MobileMenu;
