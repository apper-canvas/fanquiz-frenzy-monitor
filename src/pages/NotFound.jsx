import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PopTransition } from '../components/transitions/Transitions';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
    <PopTransition className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
  const HomeIcon = getIcon('home');
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, repeatType: "mirror", duration: 3 }} className="text-8xl font-bold text-primary">404</motion.div>
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6">
        <AlertTriangleIcon className="h-16 w-16 text-secondary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <p className="text-xl md:text-2xl mb-2">Page Not Found</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
          >Back to Home</Link>
        </motion.div>
      >
    </PopTransition>
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;