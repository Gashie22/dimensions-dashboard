import React, { useState } from 'react';
import { X, Briefcase, Zap, Calendar } from 'lucide-react';

const AddProjectModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    client: '',
    title: '',
    status: 'ACTIVE',
    impact: '',
    methodology: '4DX'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(), // Unique ID
      ...formData,
      year: new Date().getFullYear(),
      progress: 0 // Starting progress
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#000810]/90 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#002140] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-black text-white italic">INITIATE ENGAGEMENT</h2>
            <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold">Strategy & Operations</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Client Organization</label>
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
              placeholder="e.g. First Mutual Holdings"
              onChange={(e) => setFormData({...formData, client: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Engagement Title</label>
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
              placeholder="e.g. Leadership Development Program"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Primary Methodology</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                onChange={(e) => setFormData({...formData, methodology: e.target.value})}
              >
                <option value="4DX">4DX</option>
                <option value="ROI">ROI Methodology</option>
                <option value="REINA">Reina Trust</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#FFD700] uppercase tracking-tighter">Impact KPI</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                placeholder="e.g. 15% ROI"
                onChange={(e) => setFormData({...formData, impact: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FFD700] text-[#001529] py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all shadow-lg"
          >
            Launch Engagement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;