import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface StepDomainProps {
  formData: {
    domain: string;
    subdomains: string[];
  };
  updateFormData: (field: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

const domains = [
  {
    id: 'finance',
    name: '💸Finance Agents',
    description: 'Smart financial automation, savings insights, and optimization',
    subdomains: [
      'Expenditure Insights & Budgeting Agent',
      'Smart Portfolio Optimizer Agent',
      'Subscription & Recurring Expense Manager',
      'AI-Powered Financial Health Monitor'
    ]
  },
  {
    id: 'productivity',
    name: '🧠Personal Productivity & App Automation',
    description: 'Supercharging user interactions across email, messages, meetings, and more',
    subdomains: [
      'Smart Email Summarizer & Auto-Responder',
      'Calendar & Meeting Intelligence Agent',
      'Thought-to-Task AI Assistant',
      'Social Media Engagement Analyzer'
    ]
  },
  {
    id: 'education',
    name: '🎓 Education Agents',
    description: 'Personalized learning, career planning, and intelligent research',
    subdomains: [
      'AI Research Summarizer & Reference Finder',
      'Career Pathway & Skill Growth Coach',
      'Adaptive Study Planner & Learning Tracker',
      'Exam & Assignment Scheduler Agent'
    ]
  },
  {
    id: 'sports',
    name: '🏃 Sports Intelligence Agents',
    description: 'Performance, predictions, and player improvement',
    subdomains: [
      'Athlete Performance & Biomechanics Analyzer',
      'Match Predictor & Strategy Analyzer',
      'Injury Risk & Load Management Agent'
    ]
  },
  {
    id: 'software-dev',
    name: '💻Software Development Agents',
    description: 'Boosting developer productivity with intelligent automation',
    subdomains: [
      'CI/CD Pipeline & DevOps Flow Optimizer',
      'AI Code Companion & Refactoring Agent',
      'API Documentation & Auto-Testing Agent',
      'Bug Tracker & Issue Prioritizer'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Domain',
    description: 'Create a specialized agent for your unique needs',
    subdomains: []
  }
];

const StepDomain: React.FC<StepDomainProps> = ({ 
  formData, 
  updateFormData,
  errors
}) => {
  const handleDomainSelect = (domainId: string) => {
    const selectedDomain = domains.find(d => d.id === domainId);
    updateFormData('domain', domainId);
    if (selectedDomain && selectedDomain.id !== 'custom') {
      updateFormData('subdomains', selectedDomain.subdomains);
    } else {
      updateFormData('subdomains', []);
    }
  };

  const handleSubdomainToggle = (subdomain: string) => {
    const currentSubdomains = [...formData.subdomains];
    const index = currentSubdomains.indexOf(subdomain);
    
    if (index > -1) {
      currentSubdomains.splice(index, 1);
    } else {
      currentSubdomains.push(subdomain);
    }
    
    updateFormData('subdomains', currentSubdomains);
  };

  const selectedDomain = domains.find(d => d.id === formData.domain);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {domains.map((domain) => (
          <div 
            key={domain.id}
            onClick={() => handleDomainSelect(domain.id)}
            className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
              formData.domain === domain.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{domain.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{domain.description}</p>
              </div>
              {formData.domain === domain.id && (
                <span className="text-primary-500">
                  <Check className="h-5 w-5" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {errors.domain && (
        <div className="flex items-center gap-2 text-red-500 mb-4">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{errors.domain}</p>
        </div>
      )}
      
      {selectedDomain && selectedDomain.id !== 'custom' && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Sub-domains</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Select the specific areas within {selectedDomain.name} that your agent should focus on:
          </p>
          
          <div className="flex flex-wrap gap-2">
            {selectedDomain.subdomains.map((subdomain) => {
              const isSelected = formData.subdomains.includes(subdomain);
              return (
                <button
                  key={subdomain}
                  onClick={() => handleSubdomainToggle(subdomain)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-400'
                  }`}
                >
                  {subdomain}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {selectedDomain && selectedDomain.id === 'custom' && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Custom Domain</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Describe your custom domain and the specific areas your agent should focus on:
          </p>
          
          <div>
            <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Domain Name
            </label>
            <input
              type="text"
              id="customDomain"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white mb-4"
              placeholder="e.g., Healthcare Analytics"
            />
            
            <label htmlFor="customSubdomains" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sub-domains (comma-separated)
            </label>
            <input
              type="text"
              id="customSubdomains"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
              placeholder="e.g., Patient Data, Treatment Analysis, Medical Research"
              onChange={(e) => updateFormData('subdomains', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepDomain;