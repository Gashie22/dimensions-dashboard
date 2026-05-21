import React, { useState } from 'react';
import MainDashboardShell from './components/MainDashboardShell';

const INITIAL_PROJECTS = [
  { id: 1, name: "Graduate Development Program", client: "First Mutual", status: "Active", progress: 65, dueDate: "Apr 2026", team: [] },
  { id: 2, name: "Executive Coaching", client: "Old Mutual", status: "Planning", progress: 20, dueDate: "June 2026", team: [] },
  { id: 3, name: "Methodology Rollout", client: "Econet Wireless", status: "Active", progress: 45, dueDate: "May 2026", team: [] },
  { id: 4, name: "Talent Sourcing Audit", client: "African Sun", status: "Completed", progress: 100, dueDate: "Completed", team: [] }
];

function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [currentView, setCurrentView] = useState('overview');
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      {loading ? (
        <div className="min-h-screen bg-[#001529] flex items-center justify-center">
          <div className="text-[#FFD700] animate-pulse font-bold tracking-[0.5em]">
            DIMENSIONS COMMAND CENTER
          </div>
        </div>
      ) : (
        <MainDashboardShell 
          projects={projects} 
          setProjects={setProjects} // FIX: Now passing the state setter
          currentView={currentView} 
          setView={setCurrentView} 
        />
      )}
    </div>
  );
}

export default App;