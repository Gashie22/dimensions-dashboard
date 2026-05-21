import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Globe, 
  Target, 
  Plus, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Bell 
} from 'lucide-react';

// Main Components
import AnalyticsRibbon from './AnalyticsRibbon';
import ProjectCard from './ProjectCard';
import ConsultantSidebar from './ConsultantSidebar';
import MethodologyNavigator from './MethodologyNavigator';
import ProjectRiskHeatmap from './ProjectRiskHeatmap';
import RevenueImpactPulse from './RevenueImpactPulse';
import StrategicPartnersPage from './StrategicPartnersPage';
import ImpactReportCenter from './ImpactReportCenter';
import AddEngagementModal from './AddEngagementModal';

// Detail Page Components
import EngagementsDetail from './details/EngagementsDetail';
import TalentPlacedDetail from './details/TalentPlacedDetail';
import ProgramGraduatesDetail from './details/ProgramGraduatesDetail';
import ConsultancyHoursDetail from './details/ConsultancyHoursDetail';

const MainDashboardShell = ({ projects, setProjects, currentView, setView }) => {
  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CRUD Handlers
  const handleUpdateProject = (projectId, updates) => {
    if (typeof setProjects === 'function') {
      setProjects(prev => 
        prev.map(p => p.id === projectId ? { ...p, ...updates } : p)
      );
    }
  };

  const handleAddProject = (newProject) => {
    const projectWithTeam = {
      ...newProject,
      id: Date.now(),
      team: newProject.team || [{ id: 'cc', name: 'Cleopas Chiketa', initials: 'CC', role: 'Lead Consultant', isLead: true }],
      status: newProject.status || 'PLANNING'
    };
    setProjects([projectWithTeam, ...projects]);
    setIsModalOpen(false);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Remove this engagement?")) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  // Navigation Helper
  const navigateTo = (view) => {
    setView(view);
    setActiveMetric(null);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const renderContent = () => {
    // 1. Structural Views
    if (currentView === 'partners') return <StrategicPartnersPage />;
    if (currentView === 'reports') return <ImpactReportCenter projects={projects} />;

    // 2. Analytics Detail Views (Drill-downs)
    if (activeMetric === 'engagements') return <EngagementsDetail onBack={() => setActiveMetric(null)} />;
    if (activeMetric === 'talent') return <TalentPlacedDetail onBack={() => setActiveMetric(null)} />;
    if (activeMetric === 'graduates') return <ProgramGraduatesDetail onBack={() => setActiveMetric(null)} />;
    if (activeMetric === 'hours') return <ConsultancyHoursDetail onBack={() => setActiveMetric(null)} />;

    // 3. Default Overview Dashboard
    return (
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in duration-500">
        <div className="flex-1 space-y-6 lg:space-y-8">
          <AnalyticsRibbon projects={projects} onSelectMetric={setActiveMetric} />
          
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Target className="text-[#FFD700]" size={20} />
                <h2 className="text-base lg:text-lg font-bold uppercase tracking-wider text-white">Active Engagements</h2>
              </div>
              <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFD700] text-[#001529] px-4 py-3 sm:py-2 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-white transition-all shadow-[0_10px_20px_-10px_rgba(255,215,0,0.3)]">
                <Plus size={14} /> New Engagement
              </button>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              {projects.map(p => (
                <ProjectCard 
                  key={p.id} 
                  project={p} 
                  onUpdate={handleUpdateProject} 
                  onDelete={handleDeleteProject} 
                  onEdit={(proj) => { setEditingProject(proj); setIsModalOpen(true); }} 
                />
              ))}
            </div>
          </section>
          
          <section className="h-[350px] lg:h-[450px]"><MethodologyNavigator /></section>
        </div>

        {/* Sidebar Widgets */}
        <div className="w-full lg:w-96 space-y-6 lg:space-y-8">
          <RevenueImpactPulse projects={projects} />
          <ProjectRiskHeatmap projects={projects} />
          <ConsultantSidebar />
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#001529] text-slate-100 font-sans overflow-x-hidden selection:bg-[#FFD700] selection:text-[#001529]">
      {/* HEADER */}
      <header className="fixed top-0 w-full h-16 bg-[#002140]/95 backdrop-blur-xl border-b border-white/5 z-[100] flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-12">
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Section */}
          <div className="flex flex-col cursor-pointer group" onClick={() => navigateTo('overview')}>
            <span className="text-lg lg:text-xl font-black text-[#FFD700] italic group-hover:text-white transition-colors tracking-tighter">DIMENSIONS</span>
            <span className="text-[7px] lg:text-[8px] uppercase tracking-[0.3em] lg:tracking-[0.5em] text-blue-300 -mt-1 font-bold">Executive Command</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            {['overview', 'partners', 'reports'].map(v => (
              <button 
                key={v} 
                onClick={() => navigateTo(v)} 
                className={`pb-1 border-b-2 transition-all ${currentView === v ? 'text-[#FFD700] border-[#FFD700]' : 'text-slate-400 border-transparent hover:text-white'}`}
              >
                {v}
              </button>
            ))}
          </nav>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-2 lg:gap-6">
          <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Globe size={12} className="text-[#FFD700]" />
            <span className="text-[9px] font-bold text-blue-200 uppercase tracking-tighter">HQ: Harare</span>
          </div>

          <button className="p-2 text-slate-400 hover:text-[#FFD700] transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#002140]"></span>
          </button>

          {/* Profile Dropdown Component */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 group pl-3 border-l border-white/10 hover:opacity-80 transition-all"
            >
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] font-black text-white leading-tight uppercase tracking-tighter">Cleopas Chiketa</span>
                <span className="text-[8px] text-[#FFD700] font-bold uppercase leading-tight tracking-widest">Lead Consultant</span>
              </div>
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 border-[#FFD700] p-0.5 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                <div className="w-full h-full rounded-full bg-[#003366] flex items-center justify-center text-[10px] lg:text-xs font-black text-[#FFD700]">CC</div>
              </div>
              <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Profile Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-[#002140] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 hidden lg:block">
                <div className="p-4 border-b border-white/5 bg-white/5">
                  <p className="text-[9px] font-black text-[#FFD700] uppercase tracking-[0.2em] mb-1">Authenticated</p>
                  <p className="text-[11px] font-bold text-white truncate uppercase">c.chiketa@recruitai.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <User size={14} className="text-[#FFD700]" /> Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <Settings size={14} className="text-blue-400" /> Settings
                  </button>
                  <hr className="my-2 border-white/5" />
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-black uppercase text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#001529]/98 backdrop-blur-2xl lg:hidden flex flex-col pt-24 px-8 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/10">
             <div className="w-14 h-14 rounded-full border-2 border-[#FFD700] p-1">
                <div className="w-full h-full rounded-full bg-[#003366] flex items-center justify-center text-lg font-black text-[#FFD700]">CC</div>
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-black text-white uppercase italic tracking-tighter">Cleopas Chiketa</span>
                <span className="text-xs text-[#FFD700] font-bold uppercase tracking-widest">Lead Consultant</span>
             </div>
          </div>

          <nav className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tighter mb-10">
            {['overview', 'partners', 'reports'].map(v => (
              <button key={v} onClick={() => navigateTo(v)} className={`text-left transition-all ${currentView === v ? 'text-[#FFD700]' : 'text-slate-500'}`}>{v}</button>
            ))}
          </nav>
          
          <div className="mt-auto mb-12 space-y-6">
             <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400"><User size={20}/> Profile</button>
             <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-red-400"><LogOut size={20}/> Logout</button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 mt-16 p-4 lg:p-8 bg-[#001529]">
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <AddEngagementModal 
          onClose={() => { setIsModalOpen(false); setEditingProject(null); }} 
          onSubmit={editingProject ? (data) => handleUpdateProject(editingProject.id, data) : handleAddProject} 
          initialData={editingProject} 
        />
      )}
    </div>
  );
};

export default MainDashboardShell;