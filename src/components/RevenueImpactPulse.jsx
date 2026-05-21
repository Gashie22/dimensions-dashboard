import React from 'react';
import { DollarSign, BarChart } from 'lucide-react';

const RevenueImpactPulse = () => {
  return (
    <div className="bg-gradient-to-br from-[#FFD700]/20 to-transparent border border-[#FFD700]/30 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute -right-8 -bottom-8 text-white/5 transform -rotate-12">
        <BarChart size={120} />
      </div>
      <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
        <DollarSign size={14} className="text-[#FFD700]" /> Quarterly Impact Value
      </h3>
      <div className="relative z-10">
        <h2 className="text-4xl font-black text-white">$240k<span className="text-sm text-[#FFD700] ml-2">+15%</span></h2>
        <p className="text-[10px] text-blue-200 mt-2 leading-relaxed">
          Projected ROI delivered to clients across <br /> 12 active Southern African engagements.
        </p>
      </div>
    </div>
  );
};

export default RevenueImpactPulse;