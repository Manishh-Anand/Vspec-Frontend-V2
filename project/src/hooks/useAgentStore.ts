import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Node, Edge } from 'reactflow';

export type AgentType = 'main' | 'web' | 'data' | 'analytics' | 'communication' | 'custom';

export interface Agent {
  id: string;
  name: string;
  description: string;
  domain: string;
  subdomains: string[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'building' | 'ready' | 'deployed';
  nodes: Node[];
  edges: Edge[];
}

interface AgentStore {
  agents: Agent[];
  currentAgentId: string | null;
  createAgent: (agent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  setCurrentAgent: (id: string) => void;
  getCurrentAgent: () => Agent | undefined;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set, get) => ({
      agents: [],
      currentAgentId: null,
      
      createAgent: (agentData) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        
        const newAgent: Agent = {
          id,
          ...agentData,
          createdAt: now,
          updatedAt: now,
          status: 'draft',
          nodes: [],
          edges: []
        };
        
        set(state => ({
          agents: [...state.agents, newAgent],
          currentAgentId: id
        }));
        
        return id;
      },
      
      updateAgent: (id, updates) => {
        set(state => ({
          agents: state.agents.map(agent => 
            agent.id === id 
              ? { ...agent, ...updates, updatedAt: new Date().toISOString() } 
              : agent
          )
        }));
      },
      
      deleteAgent: (id) => {
        set(state => ({
          agents: state.agents.filter(agent => agent.id !== id),
          currentAgentId: state.currentAgentId === id ? null : state.currentAgentId
        }));
      },
      
      setCurrentAgent: (id) => {
        set({ currentAgentId: id });
      },
      
      getCurrentAgent: () => {
        const { agents, currentAgentId } = get();
        return agents.find(agent => agent.id === currentAgentId);
      }
    }),
    {
      name: 'agent-storage'
    }
  )
);