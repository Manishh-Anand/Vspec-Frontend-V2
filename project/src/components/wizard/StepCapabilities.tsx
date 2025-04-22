import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface StepCapabilitiesProps {
  formData: {
    capabilities: string[];
  };
  updateFormData: (field: string, value: string[]) => void;
  errors: Record<string, string>;
}

const capabilities = [
  {
    id: 'data-processing',
    name: 'Data Processing',
    description: 'Extract, transform, and analyze data from various sources',
    icon: '📊'
  },
  
  
  {
    id: 'integration',
    name: 'External Services Integration',
    description: 'Connect and interact with external APIs and services',
    icon: '🔌'
  },
  
  {
    id: 'content-generation',
    name: 'Content Generation',
    description: 'Create text, images, or other media based on prompts',
    icon: '✏️'
  },
  
  {
    id: 'monitoring',
    name: 'Monitoring & Alerts',
    description: 'Monitor data sources and send alerts based on conditions',
    icon: '🔔'
  }
];

const StepCapabilities: React.FC<StepCapabilitiesProps> = ({ 
  formData, 
  updateFormData,
  errors
}) => {
  const toggleCapability = (capabilityId: string) => {
    const currentCapabilities = [...formData.capabilities];
    const index = currentCapabilities.indexOf(capabilityId);
    
    if (index > -1) {
      currentCapabilities.splice(index, 1);
    } else {
      currentCapabilities.push(capabilityId);
    }
    
    updateFormData('capabilities', currentCapabilities);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {capabilities.map((capability) => {
          const isSelected = formData.capabilities.includes(capability.id);
          return (
            <div 
              key={capability.id}
              onClick={() => toggleCapability(capability.id)}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <span className="text-2xl" role="img" aria-label={capability.name}>{capability.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{capability.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{capability.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-primary-500 ml-2 flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {errors.capabilities && (
        <div className="flex items-center gap-2 text-red-500 mt-4">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{errors.capabilities}</p>
        </div>
      )}
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-100 dark:border-yellow-800/30 mt-6">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">Note</h4>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Select capabilities based on what your agent needs to accomplish. You'll be able to fine-tune these in the workflow editor later.
        </p>
      </div>
    </div>
  );
};

export default StepCapabilities;