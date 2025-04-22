import { useState } from 'react';
import { Node } from 'reactflow';
import { X, Save } from 'lucide-react';
import Button from '../common/Button';

interface NodeData {
  label: string;
  description: string;
  type: string;
  properties: Record<string, string>;
}

interface SettingsPanelProps {
  node: Node<NodeData>;
  updateNode: (data: Partial<NodeData>) => void;
  onClose: () => void;
}

const SettingsPanel = ({ node, updateNode, onClose }: SettingsPanelProps) => {
  const [formData, setFormData] = useState({
    label: node.data.label || '',
    description: node.data.description || '',
    properties: { ...(node.data.properties || {}) }
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePropertyChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      properties: {
        ...prev.properties,
        [key]: value
      }
    }));
  };
  
  const handleAddProperty = () => {
    setFormData(prev => ({
      ...prev,
      properties: {
        ...prev.properties,
        [`property_${Object.keys(prev.properties).length + 1}`]: ''
      }
    }));
  };
  
  const handleRemoveProperty = (key: string) => {
    setFormData(prev => {
      const newProps = { ...prev.properties };
      delete newProps[key];
      return {
        ...prev,
        properties: newProps
      };
    });
  };
  
  const handleSave = () => {
    updateNode(formData);
  };
  
  // Get type name for display
  const getTypeName = () => {
    const typeMap: Record<string, string> = {
      main: 'Main Agent',
      data: 'Data Source',
      web: 'Web Agent',
      search: 'Search Agent',
      chat: 'Chat Agent',
      integration: 'API Connector',
      code: 'Code Agent',
      document: 'Document Processor'
    };
    
    return typeMap[node.data.type] || 'Node';
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Node Settings</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
        >
          <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Type: <span className="font-medium text-gray-900 dark:text-white">{getTypeName()}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            ID: <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{node.id}</span>
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="node-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Label
            </label>
            <input
              id="node-label"
              type="text"
              value={formData.label}
              onChange={(e) => handleChange('label', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="node-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="node-description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Properties
              </label>
              <button
                onClick={handleAddProperty}
                className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                + Add Property
              </button>
            </div>
            
            {Object.entries(formData.properties).length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No properties defined</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(formData.properties).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      disabled
                      className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-dark-400 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="text"
                      value={value as string}
                      onChange={(e) => handlePropertyChange(key, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white text-sm"
                    />
                    <button
                      onClick={() => handleRemoveProperty(key)}
                      className="px-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="primary"
          onClick={handleSave}
          leftIcon={<Save className="h-4 w-4" />}
          className="w-full"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;