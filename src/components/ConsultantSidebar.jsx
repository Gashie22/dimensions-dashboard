import React from 'react';
import { ShieldCheck, GraduationCap, MapPin, ExternalLink, Download } from 'lucide-react';
// DELETE the line below - it is the source of the "Target element not found" error
// import { exportComponentAsPDF } from '../utils/exportPdf'; 

const TeamMember = ({ name, role, status, location }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
    <div className="relative">
      <div className="w-10 h-10 rounded-full bg-[#003366] border border-[#FFD700]/30 flex items-center justify-center text-xs font-bold text-[#FFD700]">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      {status === 'On-Site' && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#001529] rounded-full animate-pulse" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-semibold text-white truncate">{name}</h4>
        {status === 'On-Site' && <span className="text-[8px] text-green-400 font-bold uppercase">Live</span>}
      </div>
      <p className="text-[10px] text-blue-300 uppercase tracking-tighter flex items-center gap-1">
        {status === 'On-Site' ? <MapPin size={10} /> : null} {role} {location ? `• ${location}` : ''}
      </p>
    </div>
  </div>
);

const ConsultantSidebar = () => {
  const consultants = [
    { name: "Cleopas Chiketa", role: "Executive Coach", status: "On-Site", location: "Harare" },
    { name: "Irvin Matika", role: "Strategic Lead", status: "Remote", location: "UK" },
    { name: "Memory Chiketa", role: "MD / Facilitator", status: "On-Site", location: "Harare" },
  ];

  const partners = [
    { name: "SBS-ED", focus: "Management Development", logo: <GraduationCap size={16} /> },
    { name: "John Maxwell", focus: "Leadership Excellence", logo: <ShieldCheck size={16} /> },
  ];

  // OPTION A: Remove this function and the button below to avoid errors
  // OPTION B: Link this to a navigation change
  const handleSidebarDownload = () => {
    alert("Please navigate to 'Impact Reports' to generate high-fidelity board documents.");
  };

  return (
    <aside className="w-full bg-[#002140]/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-8 shadow-2xl">
      
      {/* Active Consultants Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-[#FFD700] uppercase tracking-[0.2em]">Team Presence</h3>
          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 font-bold">
            {consultants.filter(c => c.status === 'On-Site').length} Active
          </span>
        </div>
        <div className="space-y-1">
          {consultants.map((c, i) => <TeamMember key={i} {...c} />)}
        </div>
      </div>

      {/* Methodology / Partner Section */}
      <div>
        <h3 className="text-xs font-bold text-blue-300 uppercase tracking-[0.2em] mb-4 font-black">Strategic Frameworks</h3>
        <div className="space-y-3">
          {partners.map((p, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#FFD700]/20 transition-all cursor-help group">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[#FFD700]">{p.logo}</div>
                <ExternalLink size={12} className="text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-sm font-bold text-white">{p.name}</h4>
              <p className="text-[10px] text-blue-400 font-medium">{p.focus}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Quick Actions */}
      <div className="mt-auto p-5 bg-gradient-to-br from-[#FFD700] to-[#E6C200] rounded-2xl shadow-[0_10px_20px_rgba(255,215,0,0.1)]">
        <div className="flex items-center gap-2 mb-2">
          <Download size={14} className="text-[#001529]" />
          <p className="text-[10px] text-[#001529] font-black uppercase tracking-tighter">Executive Export</p>
        </div>
        <p className="text-[11px] text-[#001529] mb-4 font-bold leading-tight">
          Ready to present? Board reports are managed in the Impact Center.
        </p>
        <button 
          onClick={handleSidebarDownload}
          className="w-full bg-[#001529] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#003366] transition-all transform active:scale-95 shadow-lg"
        >
          View Reports
        </button>
      </div>
    </aside>
  );
};

export default ConsultantSidebar;