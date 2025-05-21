import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Fade transition component
export const FadeTransition = ({ children, delay = 0, duration = 0.5, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

FadeTransition.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string
};

// Slide transition component (can slide from different directions)
export const SlideTransition = ({ 
  children, 
  direction = 'up', 
  distance = 50, 
  delay = 0, 
  duration = 0.5, 
  className = '' 
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={getInitialPosition()}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

SlideTransition.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  distance: PropTypes.number,
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string
};

// Pop transition component
export const PopTransition = ({ children, delay = 0, duration = 0.4, className = '' }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

PopTransition.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string
};