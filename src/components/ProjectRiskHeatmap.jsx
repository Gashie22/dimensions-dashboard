import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';

const ProjectRiskHeatmap = ({ projects }) => {
  return (
    <div className="bg-[#002140]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xs font-black text-[#FFD700] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
        <ShieldAlert size={16} /> Executive Risk Radar
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((p, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${p.progress < 30 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
              <div>
                <p className="text-sm font-bold text-white">{p.name}</p>
                <p className="text-[10px] text-slate-400">{p.client}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-bold ${p.progress < 30 ? 'text-red-400' : 'text-slate-300'}`}>
                {p.progress < 30 ? 'High Intervention' : 'On Track'}
              </p>
              <p className="text-[10px] text-slate-500">Target: {p.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectRiskHeatmap;