import React from 'react';
import { Globe, Award, ShieldCheck, Zap, ExternalLink } from 'lucide-react';

// Import local assets based on your file structure
import reinaLogo from '../assets/Reina_Trust_website.png';
import cmiLogo from '../assets/cmi.png';
import roiLogo from '../assets/ROI-Logo-7-1.png';
import maxwellLogo from '../assets/DM logo.jpg';

const PartnerCard = ({ name, focus, description, icon: Icon, color, logo }) => (
  <div className="bg-[#002140]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#FFD700]/40 transition-all group relative overflow-hidden h-full flex flex-col">
    
    {/* ENHANCED VISIBILITY LOGO BACKGROUND */}
    <div 
      className="absolute right-[-5%] bottom-[-5%] w-48 h-48 opacity-[0.08] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-700 pointer-events-none mix-blend-lighten grayscale-[0.5]"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    />
    
    {/* Gradient Glow for depth */}
    <div className={`absolute -right-4 -top-4 w-32 h-32 rounded-full opacity-10 blur-3xl ${color}`} />
    
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#FFD700] shadow-inner">
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em] bg-white/10 px-2 py-1 rounded-md border border-white/5">
        Certified Ally
      </span>
    </div>

    <div className="relative z-10 flex-1">
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{name}</h3>
      <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-[#FFD700]/30"></span> {focus}
      </p>
      <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
        {description}
      </p>
    </div>

    <div className="pt-4 border-t border-white/10 flex justify-between items-center relative z-10 mt-auto">
      <button className="text-[10px] font-black text-white hover:text-[#FFD700] flex items-center gap-2 transition-colors uppercase tracking-widest group/btn">
        Methodology <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  </div>
);

const StrategicPartnersPage = () => {
  const partners = [
    {
      name: "Reina Trust Building",
      focus: "Organizational Trust",
      description: "Measuring and rebuilding trust in the workplace through the 16 Dimensions of Trust model.",
      icon: ShieldCheck,
      color: "bg-blue-600",
      logo: reinaLogo
    },
    {
      name: "Chartered Management Institute",
      focus: "Leadership Excellence",
      description: "The premier professional body in the UK dedicated to promoting the highest standards in management.",
      icon: Award,
      color: "bg-[#FFD700]",
      logo: cmiLogo
    },
    {
      name: "ROI Institute",
      focus: "Performance Analytics",
      description: "The global standard for measuring the financial impact (ROI) of human capital development.",
      icon: Zap,
      color: "bg-emerald-600",
      logo: roiLogo
    },
    {
      name: "John Maxwell Team",
      focus: "Executive Leadership",
      description: "Leadership development and coaching based on the 21 Irrefutable Laws of Leadership.",
      icon: Globe,
      color: "bg-purple-600",
      logo: maxwellLogo
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-[2px] bg-[#FFD700]"></div>
          <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">Global Alliances</h1>
        </div>
        <p className="text-blue-200/80 text-sm max-w-2xl font-medium leading-relaxed">
          Dimensions Management leverages international frameworks to deliver local results. 
          Our partners represent the global gold-standard in HR, ROI analysis, and Leadership.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((p, i) => <PartnerCard key={i} {...p} />)}
      </div>

      {/* CEO's Strategic Value Proposition based on board reports */}
      <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#001529] border-l-4 border-[#FFD700] p-8 rounded-r-2xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10">
            <Award size={80} className="text-[#FFD700]" />
        </div>
        <h4 className="text-[#FFD700] font-bold uppercase text-[10px] tracking-[0.3em] mb-3">CEO'S Strategic Note</h4>
        <p className="text-white text-lg font-medium leading-relaxed italic max-w-4xl relative z-10">
          "Our ability to bridge local Zimbabwean context with global expertise drives our <strong>$240k quarterly impact value</strong>. 
          With over <strong>412 consultancy hours</strong> delivered this period, these partnerships are the engines behind our client results."
        </p>
      </div>
    </div>
  );
};

export default StrategicPartnersPage;