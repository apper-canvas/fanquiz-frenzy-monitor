import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangleIcon } from 'lucide-react';
import { PopTransition } from '../components/transitions/Transitions';

const NotFound = () => {
  return (
    <PopTransition className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 3 }} 
        className="text-8xl font-bold text-primary mb-4"
      >
        404
      </motion.div>
      
      <p className="text-xl md:text-2xl mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="btn btn-primary inline-flex items-center space-x-2">
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </PopTransition>
  );
};

export default NotFound;