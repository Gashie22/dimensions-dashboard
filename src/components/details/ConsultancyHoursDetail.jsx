import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Calendar,
  Filter
} from 'lucide-react';

const ConsultancyHoursDetail = ({ onBack }) => {
  // Metric data reflecting the 1.2k total
  const hourMetrics = [
    { label: "Billable Utilization", value: "84%", trend: "+5%", icon: Zap, color: "text-emerald-400" },
    { label: "Avg. Hours/Project", value: "164h", trend: "-12h", icon: BarChart3, color: "text-blue-400" },
    { label: "Burn Rate", value: "Optimal", trend: "Steady", icon: TrendingUp, color: "text-[#FFD700]" },
  ];

  const projectBreakdown = [
    { id: 1, name: "Graduate Development Program", client: "First Mutual", hours: 420, cap: 600, color: "bg-[#FFD700]" },
    { id: 2, name: "Executive Coaching", client: "Old Mutual", hours: 180, cap: 250, color: "bg-blue-400" },
    { id: 3, name: "Methodology Rollout", client: "Econet Wireless", hours: 310, cap: 400, color: "bg-emerald-400" },
    { id: 4, name: "Talent Sourcing Audit", client: "African Sun", hours: 290, cap: 300, color: "bg-purple-400" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-400 hover:text-[#FFD700] transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
        </button>
        <div className="flex gap-3">
          <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white"><Filter size={18}/></button>
          <button className="px-4 py-2 bg-[#FFD700] text-[#001529] rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-white transition-all">
            Generate Timesheet
          </button>
        </div>
      </div>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="text-emerald-400" size={28} />
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Consultancy Hours</h1>
        </div>
        <p className="text-blue-300/60 uppercase text-[10px] tracking-[0.3em] font-bold">
          Time-to-Value Tracking & Resource Allocation
        </p>
      </header>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {hourMetrics.map((stat, i) => (
          <div key={i} className="bg-[#002140]/40 border border-white/10 p-6 rounded-2xl group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-amber-400'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Project Allocation Chart (Visualized with Tailwind bars) */}
      <div className="bg-[#002140]/40 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#FFD700]">Resource Burn per Engagement</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
            <Calendar size={14} /> MAY 2026
          </div>
        </div>

        <div className="space-y-8">
          {projectBreakdown.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-medium">{item.client}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-white">{item.hours}h</span>
                  <span className="text-[10px] text-slate-500 font-bold italic ml-1">/ {item.cap}h limit</span>
                </div>
              </div>
              {/* Progress Bar Container */}
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${(item.hours / item.cap) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex justify-center">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFD700]"></div>
              <span className="text-[9px] font-black uppercase text-slate-400">On-Site Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-[9px] font-black uppercase text-slate-400">Virtual Coaching</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-[9px] font-black uppercase text-slate-400">Audit & Strategy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyHoursDetail;