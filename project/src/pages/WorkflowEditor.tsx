import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeTypes,
  EdgeTypes,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel
} from 'reactflow';
import { motion } from 'framer-motion';
import { Plus, Save, Play, ChevronRight, ChevronLeft, Settings, Disc, Database, Search, Cpu } from 'lucide-react';
import 'reactflow/dist/style.css';

import Button from '../components/common/Button';
import { useAgentStore } from '../hooks/useAgentStore';
import AgentNode from '../components/workflow/AgentNode';
import CustomEdge from '../components/workflow/CustomEdge';
import NodePanel from '../components/workflow/NodePanel';
import SettingsPanel from '../components/workflow/SettingsPanel';

// Define custom node types
const nodeTypes: NodeTypes = {
  agentNode: AgentNode
};

// Define custom edge types
const edgeTypes: EdgeTypes = {
  custom: CustomEdge
};

const WorkflowEditor = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const { agents, updateAgent } = useAgentStore();
  const agent = agents.find(a => a.id === agentId);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showNodePanel, setShowNodePanel] = useState(true);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Initialize nodes and edges from agent data
  useEffect(() => {
    if (agent) {
      if (agent.nodes.length === 0) {
        // Create default nodes for new agent
        const mainAgentNode = {
          id: 'main-agent',
          type: 'agentNode',
          position: { x: 250, y: 100 },
          data: { 
            label: 'Main Agent',
            type: 'main',
            description: agent.description,
            domain: agent.domain
          }
        };
        
        setNodes([mainAgentNode]);
      } else {
        setNodes(agent.nodes);
        setEdges(agent.edges);
      }
    }
  }, [agent, setNodes, setEdges]);

  // Save nodes and edges to agent data
  const saveWorkflow = useCallback(() => {
    if (agent) {
      updateAgent(agent.id, {
        nodes,
        edges,
        updatedAt: new Date().toISOString()
      });
    }
  }, [agent, nodes, edges, updateAgent]);

  // Auto-save workflow when nodes or edges change
  useEffect(() => {
    const timer = setTimeout(() => {
      saveWorkflow();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [nodes, edges, saveWorkflow]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({
      ...connection,
      type: 'custom',
      animated: true,
      style: { stroke: '#6366F1', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#6366F1',
      },
    }, eds));
  }, [setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setShowSettingsPanel(true);
  }, []);

  const addNewNode = useCallback((type: string, nodeData: any) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: 'agentNode',
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 300 + 100 
      },
      data: { 
        label: nodeData.label,
        type,
        ...nodeData
      }
    };
    
    setNodes(nds => [...nds, newNode]);
  }, [setNodes]);

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-full relative">
      <div className="absolute top-0 left-0 z-10 flex items-center justify-between w-full p-4 bg-white dark:bg-dark-100 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {agent.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {agent.domain} • Last updated: {new Date(agent.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Save className="h-4 w-4" />}
            onClick={saveWorkflow}
          >
            Save
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Play className="h-4 w-4" />}
          >
            Deploy Agent
          </Button>
        </div>
      </div>
      
      <div className="h-full pt-16 bg-gray-50 dark:bg-dark-100">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background />
          <Controls />
          <Panel position="top-right" className="flex gap-2">
            <button 
              onClick={() => setShowNodePanel(!showNodePanel)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-dark-200 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
            >
              {showNodePanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button 
              onClick={() => setShowSettingsPanel(!showSettingsPanel)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-dark-200 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </button>
          </Panel>
        </ReactFlow>
      </div>
      
      {/* Node selector panel */}
      <motion.div 
        className="absolute top-16 right-0 bottom-0 bg-white dark:bg-dark-200 shadow-lg border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
        initial={{ width: showNodePanel ? 300 : 0 }}
        animate={{ width: showNodePanel ? 300 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {showNodePanel && (
          <NodePanel onAddNode={addNewNode} />
        )}
      </motion.div>
      
      {/* Settings panel for selected node */}
      <motion.div 
        className="absolute top-16 left-0 bottom-0 bg-white dark:bg-dark-200 shadow-lg border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
        initial={{ width: showSettingsPanel ? 300 : 0 }}
        animate={{ width: showSettingsPanel ? 300 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {showSettingsPanel && selectedNode && (
          <SettingsPanel 
            node={selectedNode} 
            updateNode={(data) => {
              setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, ...data } } : n));
            }} 
            onClose={() => setShowSettingsPanel(false)}
          />
        )}
      </motion.div>
      
      {/* Floating action button */}
      <div className="absolute bottom-6 right-6 z-10">
        <button 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors"
          onClick={() => setShowNodePanel(true)}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default WorkflowEditor;