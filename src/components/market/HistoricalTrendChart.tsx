import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { MarketDataRecord } from '../../types';
import { Info, ShieldCheck, Database } from 'lucide-react';

interface HistoricalTrendChartProps {
  data: MarketDataRecord[];
  localityName: string;
  cityName: string;
}

export const HistoricalTrendChart: React.FC<HistoricalTrendChartProps> = ({
  data,
  localityName,
  cityName
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-3">
        <Database className="w-10 h-10 text-slate-400 mx-auto" />
        <h4 className="font-semibold text-slate-800 text-sm">
          Not enough verified historical data available for {localityName}, {cityName}
        </h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          MahaProperty AI strictly presents verified government or active portal datasets. We do not synthesize or fabricate historical rates to complete graphs.
        </p>
      </div>
    );
  }

  // Format data for Recharts
  const chartData = data.map(item => ({
    year: `${item.year} (${item.verification_status})`,
    rawYear: item.year,
    'Price per Sq.Ft (₹)': item.median_price_per_sqft,
    'Median Price (Lakhs)': Math.round(item.median_price / 100000),
    status: item.verification_status,
    source: item.source_name,
    sampleSize: item.sample_size || 'N/A'
  }));

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-navy-900 flex items-center space-x-2">
            <span>3-Year Price Trend ({localityName})</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">
              Verified Data Provenance
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Median Asking vs. Official Registration Rate Trends (2024–2026)
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Source: {data[0].source_name}</span>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0A192F', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#10B981' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line 
              type="monotone" 
              dataKey="Price per Sq.Ft (₹)" 
              stroke="#059669" 
              strokeWidth={3} 
              dot={{ r: 6, fill: '#059669', stroke: '#fff', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Provenance Table Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
        {data.map(item => (
          <div key={item.id} className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Year {item.year}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${item.verification_status === 'Public Dataset' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                {item.verification_status}
              </span>
            </div>
            <div className="text-emerald-700 font-semibold text-sm">
              ₹{item.median_price_per_sqft.toLocaleString('en-IN')}/sq.ft
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Sample size: {item.sample_size || 'Portal sample'} records
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
