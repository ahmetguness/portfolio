import { motion } from 'framer-motion';

const Logo = () => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="z-50"
    >
      <button
        onClick={refreshPage}
        className="text-accent-cyan font-mono text-2xl border-2 border-accent-cyan w-12 h-12 flex items-center justify-center hover:bg-accent-cyan hover:text-space-dark transition-colors duration-300"
        aria-label="Go to top of the page"
      >
        A
      </button>
    </motion.div>
  );
};

export default Logo;
