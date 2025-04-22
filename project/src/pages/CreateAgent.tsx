import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, Upload } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAgentStore } from '../hooks/useAgentStore';

// Step components
import StepRequirements from '../components/wizard/StepRequirements';
import StepDomain from '../components/wizard/StepDomain';
import StepCapabilities from '../components/wizard/StepCapabilities';
import StepIntegrations from '../components/wizard/StepIntegrations';
import StepReview from '../components/wizard/StepReview';

const steps = [
  { id: 'domain', title: 'Domain' },
  { id: 'requirements', title: 'Requirements' },
  { id: 'capabilities', title: 'Capabilities' },
  { id: 'integrations', title: 'Integrations' },
  { id: 'review', title: 'Review' }
];

const CreateAgent = () => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: '',
    subdomains: [],
    capabilities: [],
    integrations: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { createAgent } = useAgentStore();

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const currentStep = steps[currentStepIndex].id;
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 'requirements':
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
        
      case 'domain':
        if (!formData.domain) newErrors.domain = 'Domain is required';
        break;
        
      case 'capabilities':
        if (formData.capabilities.length === 0) newErrors.capabilities = 'Select at least one capability';
        break;
        
      // No validation for integrations step as it's optional
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        // On final step, create the agent
        const agentId = createAgent({
          name: formData.name,
          description: formData.description,
          domain: formData.domain,
          subdomains: formData.subdomains,
          nodes: [],
          edges: []
        });
        
        navigate(`/editor/${agentId}`);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all your progress?')) {
      setFormData({
        name: '',
        description: '',
        domain: '',
        subdomains: [],
        capabilities: [],
        integrations: [],
      });
      setErrors({});
      setCurrentStepIndex(0);
    }
  };

  // Determine which step component to render
  const renderStepContent = () => {
    const step = steps[currentStepIndex].id;
    
    switch (step) {
      case 'requirements':
        return (
          <StepRequirements 
            formData={formData} 
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 'domain':
        return (
          <StepDomain
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 'capabilities':
        return (
          <StepCapabilities
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 'integrations':
        return (
          <StepIntegrations
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 'review':
        return (
          <StepReview
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  const buttonText = currentStepIndex === steps.length - 1 ? 'Create Agent' : 'Next';
  const buttonIcon = currentStepIndex === steps.length - 1 ? <Upload className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors ${
                  index < currentStepIndex 
                    ? 'bg-primary-600 border-primary-600 text-white' 
                    : index === currentStepIndex
                    ? 'border-primary-600 text-primary-600'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                }`}
              >
                {index < currentStepIndex ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span 
                className={`mt-2 text-xs font-medium transition-colors ${
                  index <= currentStepIndex 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-full w-full h-0.5 -translate-y-1/2 ${
                    index < currentStepIndex 
                      ? 'bg-primary-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  style={{ width: 'calc(100% - 2.5rem)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card container */}
      <Card className="p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {steps[currentStepIndex].title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {currentStepIndex === 0 && "Let's start by gathering some basic information about your agent."}
            {currentStepIndex === 1 && "Select the primary domain for your agent to operate in."}
            {currentStepIndex === 2 && "Choose the capabilities your agent will need."}
            {currentStepIndex === 3 && "Add integrations to enhance your agent's functionality."}
            {currentStepIndex === 4 && "Review your agent's configuration before creating it."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            {currentStepIndex > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                leftIcon={<ChevronLeft className="mr-2 h-4 w-4" />}
              >
                Back
              </Button>
            )}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={handleReset}
              leftIcon={<RotateCcw className="mr-2 h-4 w-4" />}
            >
              Reset
            </Button>
            <Button 
              variant="primary" 
              onClick={handleNext}
              rightIcon={buttonIcon}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateAgent;