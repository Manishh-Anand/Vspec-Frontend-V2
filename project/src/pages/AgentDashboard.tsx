import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Play, Pause, RefreshCw, MoreVertical } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAgentStore, Agent } from '../hooks/useAgentStore';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { agents, deleteAgent } = useAgentStore();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);
  
  const handleEdit = (agent: Agent) => {
    navigate(`/editor/${agent.id}`);
  };
  
  const confirmDelete = (agentId: string) => {
    setIsConfirmingDelete(agentId);
  };
  
  const handleDelete = () => {
    if (isConfirmingDelete) {
      deleteAgent(isConfirmingDelete);
      setIsConfirmingDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setIsConfirmingDelete(null);
  };
  
  // Get status badge color and text
  const getStatusBadge = (status: Agent['status']) => {
    const statusConfig = {
      draft: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300' },
      building: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
      ready: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
      deployed: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' }
    };
    
    return statusConfig[status];
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Agents</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage and deploy your custom AI agents
          </p>
        </div>
        <Button
          variant="primary"
          href="/create"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Create New Agent
        </Button>
      </div>
      
      {agents.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No agents yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Create your first agent to get started building powerful AI solutions.
            </p>
            <Button
              variant="primary"
              href="/create"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Create Your First Agent
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col">
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {agent.name}
                      </h2>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusBadge(agent.status).bg} ${getStatusBadge(agent.status).text}`}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                    </div>
                    <div className="relative">
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-300">
                        <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-3">
                    {agent.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Domain</p>
                        <p className="font-medium text-gray-900 dark:text-white">{agent.domain}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Created</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(agent.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                  {isConfirmingDelete === agent.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={cancelDelete}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        Confirm
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(agent)}
                          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-600 dark:text-gray-300"
                          title="Edit agent"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(agent.id)}
                          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-600 dark:text-gray-300"
                          title="Delete agent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {agent.status === 'deployed' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<Pause className="h-3 w-3" />}
                          >
                            Pause
                          </Button>
                        ) : agent.status === 'ready' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<Play className="h-3 w-3" />}
                          >
                            Deploy
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<RefreshCw className="h-3 w-3" />}
                            disabled={agent.status === 'building'}
                          >
                            {agent.status === 'building' ? 'Building...' : 'Build'}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;