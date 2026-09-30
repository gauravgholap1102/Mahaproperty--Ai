import React, { useState } from 'react';
import { BarChart3, ShieldCheck } from 'lucide-react';
import { SEED_MARKET_DATA } from '../data/seedMarketData';
import { HistoricalTrendChart } from '../components/market/HistoricalTrendChart';
import type { PropertyType } from '../types';

export const MarketTrendsPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [selectedLocality, setSelectedLocality] = useState('Wakad');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');

  const filteredData = SEED_MARKET_DATA.filter(m => {
    const matchCity = m.city.toLowerCase() === selectedCity.toLowerCase();
    const matchLocality = !selectedLocality || m.locality.toLowerCase() === selectedLocality.toLowerCase();
    const matchType = !propertyType || m.property_type === propertyType;
    return matchCity && matchLocality && matchType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Maharashtra Historical Market Trends & Analytics
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          3-Year Historical Price Trends (2024–2026) powered by official ready reckoner open data & verified portal analytics.
        </p>
      </div>

      {/* Filter Selection Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select City</label>
          <select 
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedLocality(e.target.value === 'Amravati' ? 'Rajapeth' : e.target.value === 'Nagpur' ? 'Civil Lines' : 'Wakad');
            }}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-semibold"
          >
            <option value="Pune">Pune</option>
            <option value="Amravati">Amravati</option>
            <option value="Nagpur">Nagpur</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Locality</label>
          <select 
            value={selectedLocality}
            onChange={(e) => setSelectedLocality(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-semibold"
          >
            {selectedCity === 'Pune' && (
              <>
                <option value="Wakad">Wakad</option>
                <option value="Baner">Baner</option>
                <option value="Kothrud">Kothrud</option>
              </>
            )}
            {selectedCity === 'Amravati' && (
              <>
                <option value="Rajapeth">Rajapeth</option>
                <option value="Badnera Road">Badnera Road</option>
                <option value="Camp Area">Camp Area</option>
              </>
            )}
            {selectedCity === 'Nagpur' && (
              <>
                <option value="Civil Lines">Civil Lines</option>
                <option value="Manish Nagar">Manish Nagar</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
          <select 
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value as PropertyType)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-semibold"
          >
            <option value="Apartment">Apartment / Flat</option>
            <option value="Villa">Villa / Independent House</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

      </div>

      {/* Main Historical Chart */}
      <HistoricalTrendChart 
        data={filteredData} 
        localityName={selectedLocality || selectedCity} 
        cityName={selectedCity} 
      />

      {/* Data Provenance Policy Box */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 border border-navy-800 space-y-3 text-xs">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold">
          <ShieldCheck className="w-5 h-5" />
          <span>Strict Data Provenance Standard</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          MahaProperty AI strictly separates verified transaction records from portal asking prices. We explicitly label all data sources:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
          <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
            <strong className="text-blue-400 block mb-0.5">Verified Government Data</strong>
            Sourced from Maharashtra IGR & Ready Reckoner public reports.
          </div>
          <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
            <strong className="text-amber-400 block mb-0.5">Portal Asking Prices</strong>
            Sourced from live active listings submitted on MahaProperty.
          </div>
          <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
            <strong className="text-emerald-400 block mb-0.5">Zero Synthetic Estimates</strong>
            We do not fill missing graphs with synthetic numbers.
          </div>
        </div>
      </div>

    </div>
  );
};
