import React, { useState } from 'react';
import { ShieldCheck, Search, Building2, CheckCircle2, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { SEED_RERA_PROJECTS } from '../data/seedGovernmentRecords';

export const ReraPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const filteredProjects = SEED_RERA_PROJECTS.filter(p => {
    const matchSearch = !searchTerm || 
      p.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.promoter_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.rera_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchDistrict = !selectedDistrict || p.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchSearch && matchDistrict;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
          <ShieldCheck className="w-5 h-5" />
          <span>Maharashtra Real Estate Regulatory Authority (MahaRERA) Directory</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          MahaRERA Verified Projects Directory
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Verify promoter credentials, official completion dates, and compliance certificates for registered housing projects in Maharashtra.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Search Project Name, Promoter, or RERA Number</label>
          <div className="relative">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. Rajapeth Elegance, P50500098765..."
              className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl p-3 pl-9 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Filter by District</label>
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl p-3 font-semibold text-slate-800"
          >
            <option value="">All Districts</option>
            <option value="Amravati">Amravati</option>
            <option value="Pune">Pune</option>
            <option value="Nagpur">Nagpur</option>
          </select>
        </div>

      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map(proj => (
          <div key={proj.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>MahaRERA Verified</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  {proj.rera_number}
                </span>
              </div>

              <h3 className="font-extrabold text-navy-900 text-base">
                {proj.project_name}
              </h3>

              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{proj.promoter_name}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{proj.locality}, {proj.city} ({proj.district})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Proposed Completion: <strong>{proj.proposed_completion_date}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded">
                Status: {proj.project_status}
              </span>

              <a 
                href={proj.official_maharera_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:underline flex items-center space-x-1"
              >
                <span>MahaRERA Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
