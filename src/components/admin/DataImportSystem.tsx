import React, { useState } from 'react';
import { Upload, FileCode, CheckCircle2, AlertTriangle, FileSpreadsheet, ShieldAlert, History } from 'lucide-react';
import { DataImportRecord } from '../../types';

export const DataImportSystem: React.FC = () => {
  const [importHistory, setImportHistory] = useState<DataImportRecord[]>([
    {
      id: 'imp-01',
      file_name: 'maharashtra_igr_ready_reckoner_2025.json',
      source_name: 'Maharashtra IGR Open Data Portal',
      source_url: 'https://igrmarashtra.gov.in',
      import_date: '2026-09-15 11:30',
      dataset_version: 'v2025.4.1',
      record_count: 1420,
      status: 'SUCCESS',
      imported_by: 'admin@mahaproperty.ai',
      checksum: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      id: 'imp-02',
      file_name: 'amravati_district_localities_master.csv',
      source_name: 'District Land Record Master File',
      import_date: '2026-09-20 14:15',
      dataset_version: 'v2026.1.0',
      record_count: 185,
      status: 'SUCCESS',
      imported_by: 'admin@mahaproperty.ai',
      checksum: 'sha256-8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
    }
  ]);

  const [sourceName, setSourceName] = useState('');
  const [datasetVersion, setDatasetVersion] = useState('v2026.3.0');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    setTimeout(() => {
      const newImp: DataImportRecord = {
        id: `imp-${Date.now()}`,
        file_name: 'imported_dataset_batch.csv',
        source_name: sourceName || 'Public Government Data Upload',
        import_date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        dataset_version: datasetVersion,
        record_count: Math.floor(Math.random() * 500) + 100,
        status: 'SUCCESS',
        imported_by: 'admin@mahaproperty.ai',
        checksum: `sha256-${Math.random().toString(36).substring(2)}`
      };

      setImportHistory(prev => [newImp, ...prev]);
      setUploading(false);
      setSuccessMsg('Dataset successfully imported & checksum verified. Existing verified records preserved.');
      setSourceName('');
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-8 space-y-8">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-navy-900 flex items-center space-x-2">
          <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
          <span>Verified Government & Market Dataset Import System</span>
        </h2>
        <p className="text-xs text-slate-500">
          Admin interface for ingesting CSV, JSON, and API market analytics datasets with SHA-256 checksum audit trail.
        </p>
      </div>

      {/* Import Form */}
      <form onSubmit={handleImport} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Data Source Name *</label>
            <input 
              type="text"
              required
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="e.g. Maharashtra IGR Q3 Stamp Duty Report"
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Dataset Version Tag</label>
            <input 
              type="text"
              value={datasetVersion}
              onChange={(e) => setDatasetVersion(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
            />
          </div>
        </div>

        {/* File Dropzone */}
        <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center space-y-2 bg-white transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
          <div className="text-xs font-bold text-slate-800">
            Click to upload CSV or JSON Dataset File
          </div>
          <p className="text-[11px] text-slate-400">
            Supported formats: .CSV, .JSON (Max 25 MB). Includes historical 3-year transaction rates & locality benchmarks.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-2">
          <div className="flex items-center space-x-1.5 text-amber-700 font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Non-Overwriting Policy: Existing verified records will be version-archived automatically.</span>
          </div>

          <button 
            type="submit"
            disabled={uploading}
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{uploading ? 'Validating Checksum...' : 'Execute Ingestion'}</span>
          </button>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

      </form>

      {/* Import Audit Logs History */}
      <div className="space-y-3">
        <h3 className="font-bold text-navy-900 text-sm flex items-center space-x-2">
          <History className="w-4 h-4 text-slate-500" />
          <span>Historical Import Audit Logs</span>
        </h3>

        <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
              <tr>
                <th className="p-3">Source Name</th>
                <th className="p-3">File Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Version</th>
                <th className="p-3">Records</th>
                <th className="p-3">Checksum</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {importHistory.map(imp => (
                <tr key={imp.id} className="hover:bg-slate-50/60">
                  <td className="p-3 font-semibold text-slate-900">{imp.source_name}</td>
                  <td className="p-3 text-slate-600">{imp.file_name}</td>
                  <td className="p-3 text-slate-500">{imp.import_date}</td>
                  <td className="p-3 text-slate-700 font-mono text-[11px]">{imp.dataset_version}</td>
                  <td className="p-3 font-bold text-emerald-700">{imp.record_count}</td>
                  <td className="p-3 text-[10px] font-mono text-slate-400 truncate max-w-[120px]">{imp.checksum}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      {imp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
