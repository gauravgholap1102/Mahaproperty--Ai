import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { DataImportSystem } from '../components/admin/DataImportSystem';
import { AIControlPanel } from '../components/admin/AIControlPanel';
import type { Property } from '../types';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'moderation' | 'imports' | 'ai'>('overview');
  const [propertiesList, setPropertiesList] = useState<Property[]>(SEED_PROPERTIES);

  const approveListing = (id: string) => {
    setPropertiesList(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          verification_status: 'Verified',
          data_provenance_badge: '✓ Verified Listing'
        };
      }
      return p;
    }));
  };

  const rejectListing = (id: string) => {
    setPropertiesList(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          verification_status: 'Rejected'
        };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900 tracking-tight flex items-center space-x-2">
            <SlidersHorizontal className="w-6 h-6 text-amber-600" />
            <span>MahaProperty AI Administrator Control Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            System metrics, listing moderation queue, dataset imports, and AI engine parameters.
          </p>
        </div>

        <div className="bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl w-fit">
          Logged in as System Admin
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto text-xs font-bold">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 transition-colors ${activeTab === 'overview' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-900'}`}
        >
          System Metrics
        </button>
        <button 
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 px-4 transition-colors ${activeTab === 'moderation' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Listing Moderation Queue ({propertiesList.filter(p => p.verification_status === 'Pending Review').length})
        </button>
        <button 
          onClick={() => setActiveTab('imports')}
          className={`pb-3 px-4 transition-colors ${activeTab === 'imports' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Data Import System
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={`pb-3 px-4 transition-colors ${activeTab === 'ai' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-900'}`}
        >
          AI Control Panel
        </button>
      </div>

      {/* Tab 1: System Metrics Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 text-[11px] font-bold block uppercase">Total Properties</span>
              <div className="text-2xl font-black text-navy-900">{propertiesList.length}</div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 text-[11px] font-bold block uppercase">Verified Listings</span>
              <div className="text-2xl font-black text-emerald-600">
                {propertiesList.filter(p => p.verification_status === 'Verified').length}
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 text-[11px] font-bold block uppercase">Pending Review</span>
              <div className="text-2xl font-black text-amber-600">
                {propertiesList.filter(p => p.verification_status === 'Pending Review').length}
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 text-[11px] font-bold block uppercase">Govt Sources Active</span>
              <div className="text-2xl font-black text-blue-600">5 Registered</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy-900 text-sm">System Health & Data Provenance Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Mahabhumi API Abstraction</span>
                <span className="text-emerald-700 font-semibold">Operational (Official Public Referrals)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">3-Year Analytics Database</span>
                <span className="text-emerald-700 font-semibold">Loaded (No Synthetic Records)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">AI RAG Search Service</span>
                <span className="text-emerald-700 font-semibold">Active & Citing Sources</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Listing Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-navy-900 text-sm">Property Moderation Queue</h3>
          <p className="text-xs text-slate-500">
            Approve or reject property submissions before public indexing.
          </p>

          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Title & Location</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Owner</th>
                  <th className="p-3">RERA ID</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {propertiesList.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="p-3">
                      <div className="font-bold text-slate-900 truncate max-w-[200px]">{p.title}</div>
                      <div className="text-[11px] text-slate-500">{p.locality}, {p.city}</div>
                    </td>
                    <td className="p-3 font-bold text-emerald-700">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-slate-700">{p.owner_name}</td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">{p.rera_id || 'N/A'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.verification_status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                        p.verification_status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {p.verification_status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {p.verification_status !== 'Verified' && (
                        <button 
                          onClick={() => approveListing(p.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg"
                        >
                          Approve
                        </button>
                      )}
                      {p.verification_status !== 'Rejected' && (
                        <button 
                          onClick={() => rejectListing(p.id)}
                          className="bg-slate-200 hover:bg-rose-600 hover:text-white text-slate-700 font-bold text-[11px] px-2.5 py-1 rounded-lg"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Data Import System */}
      {activeTab === 'imports' && <DataImportSystem />}

      {/* Tab 4: AI Controls */}
      {activeTab === 'ai' && <AIControlPanel />}

    </div>
  );
};
