import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Cpu, Database, Search, MessageSquare, Zap, Code, Globe, FileText } from 'lucide-react';

const AgentNode = ({ data }: NodeProps) => {
  // Map node types to colors and icons
  const typeConfig: Record<string, { color: string, icon: React.ReactNode }> = {
    main: { 
      color: 'bg-primary-500', 
      icon: <Cpu className="h-4 w-4 text-white" /> 
    },
    data: { 
      color: 'bg-green-500', 
      icon: <Database className="h-4 w-4 text-white" /> 
    },
    web: { 
      color: 'bg-blue-500', 
      icon: <Globe className="h-4 w-4 text-white" /> 
    },
    search: { 
      color: 'bg-orange-500', 
      icon: <Search className="h-4 w-4 text-white" /> 
    },
    chat: { 
      color: 'bg-purple-500', 
      icon: <MessageSquare className="h-4 w-4 text-white" /> 
    },
    integration: { 
      color: 'bg-amber-500', 
      icon: <Zap className="h-4 w-4 text-white" /> 
    },
    code: { 
      color: 'bg-gray-700', 
      icon: <Code className="h-4 w-4 text-white" /> 
    },
    document: { 
      color: 'bg-sky-500', 
      icon: <FileText className="h-4 w-4 text-white" /> 
    }
  };
  
  // Use default config if type not found
  const config = typeConfig[data.type] || typeConfig.main;
  
  return (
    <div className="w-48 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-dark-200 overflow-hidden">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !-left-1.5"
      />
      
      <div className={`flex items-center gap-2 px-3 py-2 ${config.color}`}>
        <div className="p-1 rounded bg-white bg-opacity-20">
          {config.icon}
        </div>
        <h3 className="font-medium text-sm text-white truncate">
          {data.label}
        </h3>
      </div>
      
      <div className="p-3">
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
          {data.description || `A ${data.type} agent that performs specialized tasks.`}
        </p>
        
        {data.properties && Object.keys(data.properties).length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            {Object.entries(data.properties).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{key}:</span>
                <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  {value as string}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !-right-1.5"
      />
    </div>
  );
};

export default memo(AgentNode);