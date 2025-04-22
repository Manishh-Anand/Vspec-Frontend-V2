import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-6">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button
            href="/"
            variant="primary"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;