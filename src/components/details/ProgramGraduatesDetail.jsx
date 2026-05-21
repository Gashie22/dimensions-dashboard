import React from 'react';
import { 
  ArrowLeft, 
  Award, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Download,
  Calendar
} from 'lucide-react';

const ProgramGraduatesDetail = ({ onBack }) => {
  // Mock data representing the "412 this month" stat
  const graduateStats = [
    { label: "Graduation Rate", value: "94%", trend: "+2.1%", icon: CheckCircle2, color: "text-green-400" },
    { label: "Post-Grad Placement", value: "82%", trend: "+5.4%", icon: TrendingUp, color: "text-blue-400" },
    { label: "Certifications Issued", value: "1.2k", trend: "+120", icon: Award, color: "text-[#FFD700]" },
  ];

  const recentGraduates = [
    { id: 1, name: "Tinashe Muranda", program: "Graduate Development", date: "May 2026", status: "Placed" },
    { id: 2, name: "Rudo Makoni", program: "Executive Leadership", date: "May 2026", status: "Active" },
    { id: 3, name: "Blessing Hove", program: "Talent Sourcing Audit", date: "Apr 2026", status: "Placed" },
    { id: 4, name: "Farai Zaba", program: "Graduate Development", date: "Apr 2026", status: "Internship" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-400 hover:text-[#FFD700] transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-white/10 transition-all">
          <Download size={14} /> Export Graduates List
        </button>
      </div>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Award className="text-purple-400" size={28} />
          <h1 className="text-4xl font-black text-white italic tracking-tighter">PROGRAM GRADUATES</h1>
        </div>
        <p className="text-blue-300/60 uppercase text-[10px] tracking-[0.3em] font-bold">
          Impact Metrics & Talent Certification Tracking
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {graduateStats.map((stat, i) => (
          <div key={i} className="bg-[#002140]/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
            <stat.icon className={`absolute -right-2 -bottom-2 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`} />
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-2 tracking-widest">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-amber-400'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Graduates Table */}
      <div className="bg-[#002140]/40 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#FFD700]">Recent Certifications</h3>
          <Calendar size={16} className="text-slate-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="px-6 py-4 font-black">Graduate Name</th>
                <th className="px-6 py-4 font-black">Program Track</th>
                <th className="px-6 py-4 font-black">Completion Date</th>
                <th className="px-6 py-4 font-black text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentGraduates.map((grad) => (
                <tr key={grad.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-black text-purple-400">
                        {grad.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors">{grad.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{grad.program}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{grad.date}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                      grad.status === 'Placed' ? 'bg-green-400/10 text-green-400' : 'bg-blue-400/10 text-blue-400'
                    }`}>
                      {grad.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgramGraduatesDetail;