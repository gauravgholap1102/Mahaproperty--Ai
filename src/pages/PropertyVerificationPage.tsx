import React from 'react';
import { Landmark, FileCheck2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GovernmentRecordLookup } from '../components/government/GovernmentRecordLookup';

export const PropertyVerificationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
          <Landmark className="w-5 h-5" />
          <span>Government Land Records & Legal Title Verification Center</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Mahabhumi & Legal Document Guide
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Comprehensive statutory guidance for checking 7/12 (Satbara), 8A extracts, CTS Property Cards, e-Hakk mutations, and MahaRERA compliance in Maharashtra.
        </p>
      </div>

      {/* Interactive Verification Lookup Component */}
      <GovernmentRecordLookup />

      {/* Educational Guide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 7/12 & 8A Guide */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-navy-900 font-bold text-base border-b pb-3">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            <span>1. 7/12 Extract (Satbara Utara)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The 7/12 extract is an excerpt from the land register maintained by the revenue department in Maharashtra.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Village Form VII (Top Section):</strong> Displays survey/gat number, occupant names, and total land area.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Village Form XII (Bottom Section):</strong> Displays crop types, irrigation details, and agricultural classification.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Check for Bank Charges (बोजा):</strong> Verify if any bank mortgage or government encumbrance is recorded.</span>
            </li>
          </ul>
          <div className="pt-2">
            <a 
              href="https://bhulekh.mahabhumi.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-1.5 font-bold text-xs text-emerald-700 hover:underline"
            >
              <span>Open Bhulekh Mahabhumi Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Urban Property Card Guide */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-navy-900 font-bold text-base border-b pb-3">
            <FileCheck2 className="w-5 h-5 text-blue-600" />
            <span>2. Property Card (Malmatta Patrak - CTS)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Property Card is the urban land record document issued by City Survey Offices (CTSO) for properties within municipal limits.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>CTS Number:</strong> Unique City Survey Number assigned to urban plots.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Ownership Chain:</strong> Documents history of sales deeds, gifts, and inheritance in urban areas.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>DigiSatbara Verification:</strong> Digital property cards carry QR codes for instant statutory verification.</span>
            </li>
          </ul>
          <div className="pt-2">
            <a 
              href="https://digisatbara.mahabhumi.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-1.5 font-bold text-xs text-blue-700 hover:underline"
            >
              <span>Open DigiSatbara Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
