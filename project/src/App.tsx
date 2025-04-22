import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import CreateAgent from './pages/CreateAgent';
import WorkflowEditor from './pages/WorkflowEditor';
import AgentDashboard from './pages/AgentDashboard';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log('App component mounted');
    console.log('Current route:', location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="create" element={<CreateAgent />} />
        <Route path="editor/:agentId" element={<WorkflowEditor />} />
        <Route path="dashboard" element={<AgentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;