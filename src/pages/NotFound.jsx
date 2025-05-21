import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const AlertTriangleIcon = getIcon('alert-triangle');
  const HomeIcon = getIcon('home');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6">
        <AlertTriangleIcon className="h-16 w-16 text-secondary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <p className="text-xl md:text-2xl mb-2">Page Not Found</p>
      <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-lg">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary inline-flex items-center gap-2"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;