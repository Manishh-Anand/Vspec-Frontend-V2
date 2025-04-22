import React from 'react';
import { Check, Info } from 'lucide-react';

interface StepIntegrationsProps {
  formData: {
    integrations: string[];
  };
  updateFormData: (field: string, value: string[]) => void;
}

const integrations = [
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Integrate with Gmail, Google Drive, Calendar, and other Google services',
    popular: true,
    logo: '🔍'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and interact with users through Slack',
    popular: true,
    logo: '💬'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Manage repositories, issues, and pull requests',
    popular: false,
    logo: '🐙'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Create and update pages and databases in Notion',
    popular: true,
    logo: '📝'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to thousands of apps through Zapier',
    popular: false,
    logo: '⚡'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Post tweets and monitor mentions and hashtags',
    popular: false,
    logo: '🐦'
  },
  {
    id: 'database',
    name: 'Database Connectors',
    description: 'Connect to SQL, MongoDB, and other databases',
    popular: false,
    logo: '💾'
  },
  {
    id: 'custom-api',
    name: 'Custom API',
    description: 'Connect to your own REST API endpoints',
    popular: false,
    logo: '🔗'
  }
];

const StepIntegrations: React.FC<StepIntegrationsProps> = ({ 
  formData, 
  updateFormData
}) => {
  const toggleIntegration = (integrationId: string) => {
    const currentIntegrations = [...formData.integrations];
    const index = currentIntegrations.indexOf(integrationId);
    
    if (index > -1) {
      currentIntegrations.splice(index, 1);
    } else {
      currentIntegrations.push(integrationId);
    }
    
    updateFormData('integrations', currentIntegrations);
  };

  // Group integrations into popular and others
  const popularIntegrations = integrations.filter(i => i.popular);
  const otherIntegrations = integrations.filter(i => !i.popular);

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Popular Integrations</h3>
          <span className="px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">Recommended</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popularIntegrations.map((integration) => {
            const isSelected = formData.integrations.includes(integration.id);
            return (
              <div 
                key={integration.id}
                onClick={() => toggleIntegration(integration.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" role="img" aria-label={integration.name}>{integration.logo}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{integration.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{integration.description}</p>
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
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Other Integrations</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherIntegrations.map((integration) => {
            const isSelected = formData.integrations.includes(integration.id);
            return (
              <div 
                key={integration.id}
                onClick={() => toggleIntegration(integration.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" role="img" aria-label={integration.name}>{integration.logo}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{integration.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{integration.description}</p>
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
      </div>
      
      <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/30">
        <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Don't worry if you're not sure about integrations yet. You can add or remove them later in the workflow editor.
        </p>
      </div>
    </div>
  );
};

export default StepIntegrations;