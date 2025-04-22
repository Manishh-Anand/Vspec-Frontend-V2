import React, { useState } from 'react';

interface StepRequirementsProps {
  formData: {
    name: string;
    description: string;
  };
  updateFormData: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const StepRequirements: React.FC<StepRequirementsProps> = ({ 
  formData, 
  updateFormData,
  errors
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    updateFormData('description', formData.description + (formData.description ? ' ' : '') + suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Agent Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white`}
          placeholder="Give your agent a name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          What should your agent do?
        </label>
        <div className="relative">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={5}
            className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white`}
            placeholder="Describe what you want your agent to do in detail..."
            onFocus={() => setShowSuggestions(true)}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
      </div>
      
      {showSuggestions && (
        <div className="bg-gray-50 dark:bg-dark-200 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggestions</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Monitor my social media for mentions and respond",
              "Analyze financial data and create reports",
              "Schedule and manage my calendar events",
              "Extract data from websites and organize it",
              "Automate customer support replies",
              "Generate weekly summaries of news in my industry"
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 text-xs bg-white dark:bg-dark-300 border border-gray-200 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800/30">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Pro tip</h4>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Be as specific as possible. Include details about data sources, desired outputs, and any specific tools the agent should use.
        </p>
      </div>
    </div>
  );
};

export default StepRequirements;