import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import { FadeTransition, SlideTransition, PopTransition } from '../components/transitions/Transitions';
import { getIcon } from '../utils/iconUtils';

const Home = () => {
  const [view, setView] = useState('categories'); // 'categories' or 'quiz'
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'friends',
      name: 'Friends',
      description: 'Test your knowledge of the iconic sitcom Friends!',
      icon: 'users',
      image: 'https://source.unsplash.com/tV80374iytg/600x400',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'modern-family',
      name: 'Modern Family',
      description: 'How well do you know the Pritchett-Dunphy-Tucker clan?',
      icon: 'home',
      image: 'https://source.unsplash.com/iG6NjE-JQwY/600x400',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'harry-potter',
      name: 'Harry Potter',
      description: 'Challenge your wizarding world knowledge!',
      icon: 'wand',
      image: 'https://source.unsplash.com/Hcl8tOIJ0L4/600x400',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setView('quiz');
  };

  const handleBackToCategories = () => {
    setView('categories');
    setSelectedCategory(null);
  };

  // Container animation
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  // Item animation
  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-6">
      <AnimatePresence mode="wait">
        {view === 'categories' ? (
          <FadeTransition key="categories" className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Welcome to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">FanQuiz Frenzy</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
              Test your knowledge of your favorite TV shows and movies with our fun trivia quizzes!
            </p>
          </motion.div>

          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category) => {
              const CategoryIcon = getIcon(category.icon);
              return (
                <PopTransition
                  delay={categories.indexOf(category) * 0.1}
                  key={category.id}
                  className="card overflow-hidden card-hover cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  <motion.div 
                    className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80`}></div>
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-6 w-6" />
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                  <p className="text-surface-600 dark:text-surface-300 mb-4">
                    {category.description}
                  </p>
                  <div className="flex justify-end">
                    <span className="btn btn-primary inline-flex items-center gap-1">
                      <span>Start Quiz</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </PopTransition>
              );
            })}
          </motion.div>
          </FadeTransition>
        ) : (
          <SlideTransition key="quiz" direction="left" className="quiz-container">
            <motion.button 
              onClick={handleBackToCategories}
              className="mb-6 btn bg-surface-200 hover:bg-surface-300 dark:bg-surface-700 dark:hover:bg-surface-600 inline-flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Back to Categories</span>
            </motion.button>
            
            <MainFeature category={selectedCategory} />
          </SlideTransition>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;