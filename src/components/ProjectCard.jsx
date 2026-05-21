import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Calendar, Target, UserPlus, Edit2, Trash2, ShieldCheck, X } from 'lucide-react';
import { DIMENSIONS_TEAM } from '../data/team';

const ProjectCard = ({ project, onUpdate, onDelete, onEdit }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setShowPicker(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddMember = (member) => {
    const currentTeam = project.team || [];
    if (!currentTeam.some(m => m.id === member.id)) {
      onUpdate(project.id, { team: [...currentTeam, member] });
    }
    setShowPicker(false);
  };

  return (
    <div className="group relative bg-[#002140]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#FFD700]/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase text-cyan-400 border-cyan-400/30 bg-cyan-400/10">
          {project.status}
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-slate-400 hover:text-white"><MoreHorizontal size={20} /></button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-[#001529] border border-white/10 rounded-xl shadow-2xl z-50">
              <button onClick={() => { onEdit(project); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-[10px] uppercase text-slate-300 hover:text-[#FFD700]"><Edit2 size={14} /> Edit</button>
              <button onClick={() => { onDelete(project.id); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-[10px] uppercase text-red-400 hover:bg-red-500/10 border-t border-white/5"><Trash2 size={14} /> Delete</button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors leading-tight">{project.name}</h3>
        <p className="text-blue-300 text-sm flex items-center gap-2 font-medium"><Target size={14} className="text-[#FFD700]" /> {project.client}</p>
      </div>

      <div className="flex justify-between items-end pt-4 border-t border-white/5">
        <div className="flex flex-col gap-2">
          <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Deployment Team</span>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {project.team?.map((m, i) => (
                <div key={`${m.id}-${i}`} className={`w-9 h-9 rounded-full border-2 border-[#002140] flex items-center justify-center text-[10px] font-black relative ${m.isLead ? 'bg-[#FFD700] text-[#001529] z-10' : 'bg-[#003366] text-[#FFD700]'}`} title={m.name}>
                  {m.initials}
                  {m.isLead && <ShieldCheck size={10} className="absolute -top-1 -right-1 text-[#FFD700] bg-[#002140] rounded-full p-0.5" />}
                </div>
              ))}
            </div>

            <div className="relative" ref={pickerRef}>
              <button onClick={() => setShowPicker(!showPicker)} className="w-9 h-9 rounded-full border border-dashed border-white/20 flex items-center justify-center text-slate-500 hover:border-[#FFD700] transition-all">
                <UserPlus size={16} />
              </button>
              {showPicker && (
                <div className="absolute bottom-full left-0 mb-3 w-64 bg-[#001529] border border-white/10 rounded-2xl shadow-2xl z-[110] p-4 pointer-events-auto">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[10px] font-black text-[#FFD700] uppercase">Select Associate</h4>
                    <button onClick={() => setShowPicker(false)}><X size={14} /></button>
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {[...DIMENSIONS_TEAM.leadership, ...DIMENSIONS_TEAM.creative].map(staff => (
                      <button key={staff.id} onClick={() => handleAddMember(staff)} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left group">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black ${staff.isLead ? 'bg-[#FFD700] text-[#001529]' : 'bg-[#003366] text-[#FFD700]'}`}>{staff.initials}</div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-bold text-white group-hover:text-[#FFD700] truncate">{staff.name}</p>
                          <p className="text-[8px] text-slate-500 uppercase truncate">{staff.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] font-black uppercase text-slate-500">Target</span>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold"><Calendar size={14} /> {project.dueDate}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;