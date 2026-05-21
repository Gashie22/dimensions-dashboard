import React from 'react';
import { ArrowLeft, Filter, Search } from 'lucide-react';

const EngagementsDetail = ({ onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#FFD700] transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Overview</span>
        </button>
        <div className="flex gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input placeholder="Search Engagements..." className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-[#FFD700]/50" />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:text-[#FFD700]"><Filter size={16}/></button>
        </div>
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">ENGAGEMENT COMMAND</h1>
        <p className="text-blue-300/60 uppercase text-[10px] tracking-[0.3em] font-bold">14 Active Strategic Initiatives</p>
      </header>

      {/* Stats Grid for this specific page */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Utilization Rate</p>
          <div className="text-2xl font-bold text-white">88.4%</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Pipeline Value</p>
          <div className="text-2xl font-bold text-[#FFD700]">$420k</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Average Health</p>
          <div className="text-2xl font-bold text-green-400">Excellent</div>
        </div>
      </div>
    </div>
  );
};

export default EngagementsDetail;