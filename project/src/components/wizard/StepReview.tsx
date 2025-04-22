import React from 'react';

interface StepReviewProps {
  formData: {
    name: string;
    description: string;
    domain: string;
    subdomains: string[];
    capabilities: string[];
    integrations: string[];
  };
}

// Maps for displaying readable names
const domainMap: Record<string, string> = {
  'data-analysis': 'Data Analysis',
  'content-creation': 'Content Creation',
  'personal-assistant': 'Personal Assistant',
  'customer-support': 'Customer Support',
  'research': 'Research',
  'custom': 'Custom Domain'
};

const capabilityMap: Record<string, string> = {
  'data-processing': 'Data Processing',
  'natural-language': 'Natural Language Understanding',
  'automation': 'Task Automation',
  'integration': 'External Services Integration',
  'learning': 'Continuous Learning',
  'content-generation': 'Content Generation',
  'decision-making': 'Decision Making',
  'monitoring': 'Monitoring & Alerts'
};

const integrationMap: Record<string, string> = {
  'google': 'Google Workspace',
  'slack': 'Slack',
  'github': 'GitHub',
  'notion': 'Notion',
  'zapier': 'Zapier',
  'twitter': 'Twitter',
  'database': 'Database Connectors',
  'custom-api': 'Custom API'
};

const StepReview: React.FC<StepReviewProps> = ({ formData }) => {
  const formatCapabilities = () => {
    return formData.capabilities.map(c => capabilityMap[c] || c).join(', ');
  };
  
  const formatIntegrations = () => {
    if (formData.integrations.length === 0) return 'None selected';
    return formData.integrations.map(i => integrationMap[i] || i).join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-dark-200 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Agent Summary</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h4>
            <p className="mt-1 text-gray-900 dark:text-white">{formData.name}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
            <p className="mt-1 text-gray-900 dark:text-white">{formData.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Domain</h4>
            <p className="mt-1 text-gray-900 dark:text-white">{domainMap[formData.domain] || formData.domain}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sub-domains</h4>
            <p className="mt-1 text-gray-900 dark:text-white">
              {formData.subdomains.length > 0 ? formData.subdomains.join(', ') : 'None selected'}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Capabilities</h4>
            <p className="mt-1 text-gray-900 dark:text-white">{formatCapabilities()}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Integrations</h4>
            <p className="mt-1 text-gray-900 dark:text-white">{formatIntegrations()}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-100 dark:border-green-800/30">
        <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Ready to Create</h4>
        <p className="text-sm text-green-700 dark:text-green-400">
          Your agent configuration is complete. Click "Create Agent" to build your agent and open the workflow editor.
        </p>
      </div>
    </div>
  );
};

export default StepReview;