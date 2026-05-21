import React, { useState } from 'react';
// Added 'Target' to the imports to resolve the ReferenceError
import { BookOpen, BarChart3, Shield, ChevronRight, Target } from 'lucide-react';

const MethodologyNavigator = () => {
  const [activeTab, setActiveTab] = useState('4DX');

  const frameworks = {
    '4DX': {
      title: "4 Disciplines of Execution",
      partner: "FranklinCovey Alignment",
      description: "Focus on the Wildly Important Goal (WIG) through lead measures and a cadence of accountability.",
      steps: ["Focus on WIG", "Act on Lead Measures", "Keep a Scoreboard", "Cadence of Accountability"],
      icon: <Target className="text-[#FFD700]" />
    },
    'ROI': {
      title: "ROI Methodology",
      partner: "ROI Institute",
      description: "Measuring the actual financial impact and return on investment for human resources interventions.",
      steps: ["Data Collection", "Data Analysis", "Isolation of Effects", "ROI Calculation"],
      icon: <BarChart3 className="text-blue-400" />
    },
    'Leadership': {
      title: "5 Levels of Leadership",
      partner: "John Maxwell",
      description: "A framework for developing leaders who people follow because they want to, not because they have to.",
      steps: ["Position", "Permission", "Production", "People Development", "Pinnacle"],
      icon: <Shield className="text-purple-400" />
    }
  };

  return (
    <div className="bg-[#002140]/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-full">
      <div className="p-6 border-b border-white/5 bg-[#003366]/30 flex justify-between items-center">
        <h3 className="text-sm font-bold text-[#FFD700] uppercase tracking-widest flex items-center gap-2">
          <BookOpen size={16} /> Framework Deployment
        </h3>
        <div className="opacity-50">
          {frameworks[activeTab].icon}
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar Tabs */}
        <div className="w-1/3 border-r border-white/5">
          {Object.keys(frameworks).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full text-left p-4 transition-all flex items-center justify-between group ${
                activeTab === key ? 'bg-[#FFD700]/10 border-r-2 border-[#FFD700]' : 'hover:bg-white/5'
              }`}
            >
              <span className={`text-xs font-bold uppercase ${activeTab === key ? 'text-[#FFD700]' : 'text-white'}`}>
                {key}
              </span>
              <ChevronRight size={14} className={activeTab === key ? 'text-[#FFD700]' : 'text-slate-600'} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-2/3 p-6 bg-gradient-to-br from-transparent to-[#003366]/20">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-white mb-1">{frameworks[activeTab].title}</h4>
            <p className="text-[10px] text-[#FFD700] uppercase tracking-widest font-bold mb-3">
              Partner: {frameworks[activeTab].partner}
            </p>
            <p className="text-xs text-blue-100/80 leading-relaxed italic">
              "{frameworks[activeTab].description}"
            </p>
          </div>

          <div className="space-y-2">
            {frameworks[activeTab].steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5 group hover:border-[#FFD700]/30 transition-all cursor-default">
                <span className="text-[10px] font-black text-[#FFD700] bg-[#FFD700]/10 w-5 h-5 rounded flex items-center justify-center border border-[#FFD700]/20">
                  {index + 1}
                </span>
                <span className="text-xs text-white font-medium group-hover:text-[#FFD700] transition-colors">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyNavigator;