import { useState } from 'react';
import { Search, X, Cpu, Database, Globe, MessageSquare, Zap, Code, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface NodeData {
  label: string;
  description: string;
  [key: string]: unknown;
}

interface NodePanelProps {
  onAddNode: (type: string, data: NodeData) => void;
}

interface NodeCategory {
  id: string;
  name: string;
  nodes: {
    id: string;
    type: string;
    name: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const NodePanel = ({ onAddNode }: NodePanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'agents': true,
    'data': true,
    'integrations': true,
    'utilities': true
  });
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  // Define node categories and their nodes
  const categories: NodeCategory[] = [
    {
      id: 'agents',
      name: 'Agents',
      nodes: [
        {
          id: 'main-agent',
          type: 'main',
          name: 'Main Agent',
          description: 'Primary agent that orchestrates other specialized agents',
          icon: <Cpu className="h-4 w-4" />
        },
        {
          id: 'web-agent',
          type: 'web',
          name: 'Web Agent',
          description: 'Browses and interacts with web content',
          icon: <Globe className="h-4 w-4" />
        },
        {
          id: 'chat-agent',
          type: 'chat',
          name: 'Chat Agent',
          description: 'Handles conversations and natural language interactions',
          icon: <MessageSquare className="h-4 w-4" />
        },
        {
          id: 'code-agent',
          type: 'code',
          name: 'Code Agent',
          description: 'Generates and analyzes code',
          icon: <Code className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'data',
      name: 'Data Processing',
      nodes: [
        {
          id: 'data-source',
          type: 'data',
          name: 'Data Source',
          description: 'Connects to databases and data stores',
          icon: <Database className="h-4 w-4" />
        },
        {
          id: 'search-agent',
          type: 'search',
          name: 'Search Agent',
          description: 'Searches through documents and data',
          icon: <Search className="h-4 w-4" />
        },
        {
          id: 'document-processor',
          type: 'document',
          name: 'Document Processor',
          description: 'Processes text documents and extracts information',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'integrations',
      name: 'Integrations',
      nodes: [
        {
          id: 'api-connector',
          type: 'integration',
          name: 'API Connector',
          description: 'Connects to external APIs and services',
          icon: <Zap className="h-4 w-4" />
        }
      ]
    }
  ];
  
  // Filter nodes based on search query
  const filteredCategories = categories.map(category => ({
    ...category,
    nodes: category.nodes.filter(node => 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.nodes.length > 0);
  
  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Node Library</h2>
      </div>
      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search nodes..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
        {filteredCategories.map((category) => (
          <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex justify-between items-center w-full px-4 py-2 bg-gray-50 dark:bg-dark-300 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
            >
              {category.name}
              {expandedCategories[category.id] ? (
                <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            
            {expandedCategories[category.id] && (
              <div className="p-2 space-y-2">
                {category.nodes.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => onAddNode(node.type, { label: node.name, description: node.description })}
                    className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-400 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {node.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{node.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{node.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodePanel;