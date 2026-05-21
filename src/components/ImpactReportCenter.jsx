import React, { useState } from 'react';
import { FileBarChart, Download, CheckCircle2, Clock, Share2, TrendingUp, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Import the logo from your assets folder
import dmLogo from '../assets/DM logo.jpg';

const ReportRow = ({ title, type, date, status, impact, onDownload }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-[#FFD700]/30 transition-all group">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-[#FFD700]/10 text-[#FFD700]">
        <FileBarChart size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors">{title}</h4>
        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{type} • {date}</p>
      </div>
    </div>

    <div className="flex items-center gap-8">
      <div className="hidden md:block text-right">
        <p className="text-[10px] text-blue-300 uppercase font-black">Measured Impact</p>
        <p className="text-xs font-bold text-green-400">{impact}</p>
      </div>
      
      <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
        status === 'Finalized' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-amber-500/30 text-amber-400 bg-amber-400/10'
      }`}>
        {status}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onDownload({ title, type, date, status, impact })} 
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Download size={16} />
        </button>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

const ImpactReportCenter = () => {
  const [isExporting, setIsExporting] = useState(false);

  const reports = [
    { title: "First Mutual Graduate Impact Study", type: "ROI Analysis", date: "May 2026", status: "Finalized", impact: "+18% Productivity" },
    { title: "Quarterly Leadership Alignment", type: "Reina Trust Audit", date: "April 2026", status: "Pending Review", impact: "92% Trust Score" },
    { title: "Econet 4DX Execution Audit", type: "Performance Report", date: "March 2026", status: "Finalized", impact: "WIG Attainment: 88%" }
  ];

  // Helper to convert Image to Base64
  const getBase64Image = (imgUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgUrl;
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.onerror = (error) => reject(error);
    });
  };

  const generatePDF = async (specificReport = null) => {
    setIsExporting(true);

    try {
      const doc = new jsPDF();
      const navy = [0, 21, 41];
      const gold = [255, 215, 0];

      // --- ADD LOGO ---
      try {
        const logoData = await getBase64Image(dmLogo);
        // Parameters: data, type, x, y, width, height
        doc.addImage(logoData, 'JPEG', 14, 12, 12, 12);
      } catch (e) {
        console.warn("Logo could not be loaded, skipping image.");
      }

      // --- BRANDING ---
      doc.setFont("helvetica", "bold");
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.setFontSize(22);
      // X shifted to 28 to sit next to the logo
      doc.text("DIMENSIONS", 28, 20);
      
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text("MANAGEMENT CONSULTANTS", 28, 25);
      
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.5);
      doc.line(14, 30, 196, 30);

      // --- DOCUMENT HEADER ---
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text(specificReport ? "ENGAGEMENT SUMMARY" : "EXECUTIVE BOARD REPORT", 14, 45);
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Runhare House, Harare | Generated: ${new Date().toLocaleDateString()}`, 14, 52);

      // --- TABLE DATA ---
      const tableColumn = ["Engagement", "Methodology", "Status", "Impact"];
      const tableRows = specificReport 
        ? [[specificReport.title, specificReport.type, specificReport.status, specificReport.impact]]
        : reports.map(r => [r.title, r.type, r.status, r.impact]);

      autoTable(doc, {
        startY: 62,
        head: [tableColumn],
        body: tableRows,
        headStyles: { fillColor: navy, textColor: [255, 255, 255], fontStyle: 'bold' },
        bodyStyles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });

      // --- SUMMARY FOOTER ---
      const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 150;
      if (!specificReport) {
        doc.setFont("helvetica", "bold");
        doc.text("Strategic KPIs:", 14, finalY);
        doc.setFont("helvetica", "normal");
        doc.text(`• Aggregate Portfolio ROI: 312%`, 14, finalY + 7);
        doc.text(`• Reporting Cycle: Monthly Executive Review`, 14, finalY + 13);
      }

      // --- FOOTER ---
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(150);
      for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Dimensions Confidential - Page ${i} of ${pageCount}`, 14, 285);
      }

      const fileName = specificReport 
        ? `Report_${specificReport.title.replace(/\s+/g, '_').substring(0, 15)}.pdf` 
        : "Dimensions_Executive_Summary.pdf";

      doc.save(fileName);

    } catch (err) {
      console.error("PDF Export failed:", err);
      alert("Failed to generate PDF. Check console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end bg-[#001529] pb-4">
        <div>
          <h1 className="text-2xl font-black text-white italic">IMPACT ANALYTICS</h1>
          <p className="text-blue-300 text-xs uppercase tracking-widest font-bold">Executive ROI Portal</p>
        </div>
        
        <button 
          onClick={() => generatePDF()}
          disabled={isExporting}
          className="flex items-center gap-2 bg-[#FFD700] text-[#001529] px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-yellow-400 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
        >
          {isExporting ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
          {isExporting ? "PREPARING..." : "EXPORT BOARD REPORT"}
        </button>
      </div>

      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#003366] to-[#001529] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-blue-300 mb-4">
              <TrendingUp size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Aggregate ROI</span>
            </div>
            <h2 className="text-3xl font-black text-white">312%</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium italic">Return on investment for 2026</p>
          </div>

          <div className="bg-gradient-to-br from-[#003366] to-[#001529] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-[#FFD700] mb-4">
              <CheckCircle2 size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Goal Completion</span>
            </div>
            <h2 className="text-3xl font-black text-white">14/16</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium italic">Strategic WIGs achieved</p>
          </div>

          <div className="bg-gradient-to-br from-[#003366] to-[#001529] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <Clock size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Cadence</span>
            </div>
            <h2 className="text-3xl font-black text-white">Monthly</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium italic">Board summary frequency</p>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="bg-[#002140]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Recent Deliverables</h3>
          <div className="space-y-3">
            {reports.map((report, index) => (
              <ReportRow 
                key={index} 
                {...report} 
                onDownload={generatePDF} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReportCenter;