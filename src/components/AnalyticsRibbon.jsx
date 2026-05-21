import React from 'react';
import { TrendingUp, Users, Award, Target, Activity } from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full text-left relative overflow-hidden bg-[#002140]/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:border-[#FFD700]/40 active:scale-[0.98]"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl ${color}`} />
    
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-[#FFD700] transition-colors">
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${
          trend.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-amber-400 bg-amber-400/10'
        }`}>
          <Activity size={10} />
          {trend}
        </div>
      )}
    </div>

    <div>
      <p className="text-blue-200/60 text-xs font-semibold uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        <span className="text-[10px] text-blue-400 font-medium">this month</span>
      </div>
    </div>
  </button>
);

const AnalyticsRibbon = ({ onSelectMetric }) => {
  const stats = [
    { id: 'engagements', label: "Active Engagements", value: "14", trend: "+2", icon: Target, color: "bg-[#FFD700]" },
    { id: 'talent', label: "Total Talent Placed", value: "128", trend: "+12%", icon: Users, color: "bg-blue-400" },
    { id: 'graduates', label: "Program Graduates", value: "412", trend: "+45", icon: Award, color: "bg-purple-400" },
    { id: 'hours', label: "Consultancy Hours", value: "1.2k", trend: "+8%", icon: TrendingUp, color: "bg-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} onClick={() => onSelectMetric(stat.id)} />
      ))}
    </div>
  );
};

export default AnalyticsRibbon;