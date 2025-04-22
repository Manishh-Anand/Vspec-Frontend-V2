import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Layers, Workflow, Settings } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Hello there');
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Get time of day for greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Try to get user name from localStorage
    const savedName = localStorage.getItem('userName');
    if (savedName) setName(savedName);
  }, []);

  const handleNameSubmit = () => {
    if (inputValue.trim()) {
      setName(inputValue.trim());
      localStorage.setItem('userName', inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const features = [
    {
      title: 'Multi-Step Agent Creation',
      description: 'Guided wizard for building your AI agent with detailed requirement gathering.',
      icon: <Brain className="h-8 w-8 text-primary-500" />
    },
    {
      title: 'Domain Classification',
      description: 'Automatically categorizes your agent needs and builds the optimal architecture.',
      icon: <Layers className="h-8 w-8 text-primary-500" />
    },
    {
      title: 'Visual Workflow Editor',
      description: 'Drag and drop interface to customize and fine-tune your agent\'s behavior.',
      icon: <Workflow className="h-8 w-8 text-primary-500" />
    },
    {
      title: 'Complete Customization',
      description: 'Full control over every aspect of your agent with detailed configuration options.',
      icon: <Settings className="h-8 w-8 text-primary-500" />
    }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              {greeting}{name ? `, ${name}` : ''}.
            </h1>
            <h2 className="text-2xl sm:text-3xl mb-8 font-light">
              What can I help you build today?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 relative max-w-2xl mx-auto"
          >
            <div className="relative z-10 flex items-center gap-2 p-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-white border-opacity-20">
              {!name && (
                <>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What's your name?"
                    className="w-full bg-transparent text-white placeholder-gray-300 py-3 px-4 focus:outline-none"
                  />
                  <Button 
                    onClick={handleNameSubmit}
                    className="bg-white text-primary-800 hover:bg-gray-100"
                  >
                    Continue
                  </Button>
                </>
              )}
              {name && (
                <div className="flex w-full justify-between items-center">
                  <span className="py-3 px-4 text-white">Begin creating your custom AI agent</span>
                  <Button 
                    onClick={() => navigate('/create')}
                    rightIcon={<ArrowRight />}
                    className="bg-white text-primary-800 hover:bg-gray-100"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
            <div
              className="absolute inset-0 bg-primary-600 rounded-lg blur-lg opacity-30"
              style={{ zIndex: -1 }}
            ></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose V-Spec</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Build powerful, custom AI agents without code. Our visual editor makes it simple to create, customize, and deploy in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hoverable className="p-6 h-full flex flex-col">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to build your custom AI agent?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Get started in minutes with our intuitive agent creation wizard.
          </p>
          <Button
            variant="primary"
            size="lg"
            href="/create"
            rightIcon={<ArrowRight />}
          >
            Create Your First Agent
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;