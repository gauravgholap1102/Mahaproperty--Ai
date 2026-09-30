import React, { useState } from 'react';
import { Search, ShieldCheck, ExternalLink, FileText, CheckCircle2, AlertCircle, Building, Landmark } from 'lucide-react';
import { GovernmentDataProvider } from '../../services/governmentDataProvider';
import { GovernmentRecord, GovernmentRecordType } from '../../types';
import { MAHARASHTRA_DISTRICTS } from '../../data/locations';

export const GovernmentRecordLookup: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Amravati');
  const [recordType, setRecordType] = useState<GovernmentRecordType>('7/12 Extract (Satbara)');
  const [queryInput, setQueryInput] = useState('142/1A');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    record: GovernmentRecord | null;
    official_portal_link: string;
    is_available_online: boolean;
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (recordType.includes('7/12')) {
        const res = await GovernmentDataProvider.getRecordOfRights(selectedDistrict, 'Amravati', 'Mahuli', queryInput);
        setSearchResult(res);
      } else if (recordType.includes('Property Card')) {
        const res = await GovernmentDataProvider.getPropertyCard(selectedDistrict, queryInput || 'CTS 1042');
        setSearchResult(res);
      } else {
        const res = await GovernmentDataProvider.getMutationInformation(selectedDistrict, queryInput);
        setSearchResult(res);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-premium p-6 sm:p-8 space-y-8">
      
      {/* Module Title */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Landmark className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-navy-900">
            Maharashtra Government Property Record Verification
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Official Mahabhumi (Bhulekh & DigiSatbara) verification framework for 7/12, 8A, Property Cards, and Mutation Entries.
        </p>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        
        {/* District Select */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select District</label>
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500"
          >
            {MAHARASHTRA_DISTRICTS.map(d => (
              <option key={d.id} value={d.name_en}>{d.name_en}</option>
            ))}
          </select>
        </div>

        {/* Record Type Select */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Record Type</label>
          <select 
            value={recordType}
            onChange={(e) => setRecordType(e.target.value as GovernmentRecordType)}
            className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="7/12 Extract (Satbara)">7/12 Extract (Satbara)</option>
            <option value="8A Extract">8A Extract</option>
            <option value="Property Card (Malmatta Patrak)">Property Card (CTS)</option>
            <option value="Mutation Entry (e-Hakk)">Mutation Entry (e-Hakk)</option>
          </select>
        </div>

        {/* Survey / Gat / CTS No Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Gat / CTS / Survey No.</label>
          <input 
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="e.g. 142/1A or CTS 1042"
            className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Search Submit Button */}
        <div className="flex items-end">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>{loading ? 'Searching Record...' : 'Verify Record'}</span>
          </button>
        </div>

      </form>

      {/* Result Display Box */}
      {searchResult && (
        <div className="space-y-6 pt-2">
          
          {searchResult.is_available_online && searchResult.record ? (
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 space-y-4">
              
              {/* Header Status */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-950 text-sm">
                    {searchResult.record.record_type} Found
                  </span>
                </div>

                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {searchResult.record.verification_status}
                </span>
              </div>

              {/* Specification Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Source Portal</span>
                  <span className="font-semibold text-slate-900">Maharashtra Government / Mahabhumi</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Survey / Gat No</span>
                  <span className="font-semibold text-slate-900">{searchResult.record.survey_gat_no || searchResult.record.cts_no || 'N/A'}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Masked Owner Title</span>
                  <span className="font-semibold text-slate-900">{searchResult.record.owner_names_masked}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Land Area</span>
                  <span className="font-semibold text-slate-900">{searchResult.record.total_area_hectares_or_sqm}</span>
                </div>
              </div>

              {/* Status Note */}
              <div className="flex items-center justify-between text-xs pt-2">
                <div className="text-slate-600 font-medium">
                  <strong>Encumbrance Status:</strong> {searchResult.record.encumbrance_status}
                </div>
                <a 
                  href={searchResult.record.official_source_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1 font-bold text-emerald-700 hover:underline"
                >
                  <span>Open Official Mahabhumi Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Official online lookup required on Mahabhumi Portal</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Direct online record query for <strong>{queryInput}</strong> in <strong>{selectedDistrict}</strong> requires authenticated citizen login on the official Maharashtra government portal.
              </p>
              <div>
                <a 
                  href={searchResult.official_portal_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
                >
                  <span>Open Official Maharashtra Property Record Service</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Mandatory Government Disclaimer */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-normal">
            <strong className="text-slate-700">Important Disclaimer:</strong> Government record information is displayed for informational purposes only. Verify the latest official certified copy before making any legal or financial decision.
          </div>

        </div>
      )}

    </div>
  );
};
