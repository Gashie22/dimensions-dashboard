import React, { useState } from 'react';
import { X, Target, Zap, Shield, Briefcase, Activity } from 'lucide-react';

const AddEngagementModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    client: '',
    title: '',
    methodology: '4DX',
    status: 'PLANNING', // Default to planning
    impact: '',
    progress: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Progress auto-sets based on status
    const initialProgress = formData.status === 'COMPLETED' ? 100 : formData.status === 'ACTIVE' ? 10 : 0;
    
    onSubmit({
      id: Date.now(),
      year: new Date().getFullYear(),
      ...formData,
      progress: initialProgress
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#000810]/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#002140] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h3 className="text-white font-black italic tracking-tight text-xl uppercase">Initiate Engagement</h3>
            <p className="text-blue-300 text-[10px] uppercase tracking-widest font-bold">Strategic Value Creation</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-5">
            {/* Client & Title Inputs (Same as before) */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Client Organization</label>
              <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FFD700] outline-none transition-all" placeholder="Client Name" onChange={(e) => setFormData({...formData, client: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Engagement Focus</label>
              <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FFD700] outline-none transition-all" placeholder="Project Title" onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">
                <Activity size={12} /> Engagement Phase
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['PLANNING', 'ACTIVE', 'COMPLETED'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({...formData, status})}
                    className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${
                      formData.status === status 
                        ? 'bg-[#FFD700] text-[#001529] border-[#FFD700]' 
                        : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Framework</label>
                <select className="w-full bg-[#001529] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" onChange={(e) => setFormData({...formData, methodology: e.target.value})}>
                  <option value="4DX">4DX Alignment</option>
                  <option value="ROI">ROI Methodology</option>
                  <option value="REINA">Reina Trust Audit</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Target Impact</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" placeholder="e.g. 20% ROI" onChange={(e) => setFormData({...formData, impact: e.target.value})} />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#FFD700] text-[#001529] py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-lg">
            Deploy Engagement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEngagementModal;