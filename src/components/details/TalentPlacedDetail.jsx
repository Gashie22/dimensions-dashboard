import React from 'react';
import { ArrowLeft, Users, UserCheck } from 'lucide-react';

const TalentPlacedDetail = ({ onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#FFD700] mb-8">
      <ArrowLeft size={20} /> <span className="text-[10px] font-black uppercase">Dashboard</span>
    </button>
    <h1 className="text-4xl font-black text-white italic mb-10">TALENT LOGISTICS</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#002140]/40 border border-white/10 p-8 rounded-3xl">
        <Users className="text-[#FFD700] mb-4" size={32} />
        <h3 className="text-xl font-bold text-white mb-2">Total Placements</h3>
        <p className="text-slate-400 text-sm">128 associates successfully deployed across active contracts this quarter.</p>
      </div>
      <div className="bg-[#002140]/40 border border-white/10 p-8 rounded-3xl">
        <UserCheck className="text-blue-400 mb-4" size={32} />
        <h3 className="text-xl font-bold text-white mb-2">Lead Availability</h3>
        <p className="text-slate-400 text-sm">4 Lead Consultants currently in rotation for new mandates.</p>
      </div>
    </div>
  </div>
);

export default TalentPlacedDetail;