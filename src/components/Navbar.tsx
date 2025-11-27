import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { CgMenuRight } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: "About", path: "/#about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-space-dark/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="text-light-gray hover:text-accent-cyan transition-colors duration-300 font-mono"
                >
                  <span className="text-accent-cyan">0{index + 1}.</span> {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="md:hidden z-50">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-3xl text-light-gray hover:text-accent-cyan transition-colors"
              aria-label="Open menu"
              whileTap={{ scale: 0.9 }}
            >
              <CgMenuRight />
            </motion.button>
          </div>
        </div>
      </motion.nav>
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

export default Navbar;
