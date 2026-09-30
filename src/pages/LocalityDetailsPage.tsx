import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, School, Hospital, Bus, Sparkles, BarChart3 } from 'lucide-react';
import { TOP_LOCALITIES } from '../data/locations';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { PropertyCard } from '../components/property/PropertyCard';
import { HistoricalTrendChart } from '../components/market/HistoricalTrendChart';
import { MarketAnalyticsService } from '../services/marketAnalytics';

export const LocalityDetailsPage: React.FC = () => {
  const { locality } = useParams<{ city?: string; locality?: string }>();
  
  const targetLocality = TOP_LOCALITIES.find(
    l => l.name_en.toLowerCase() === (locality || 'rajapeth').toLowerCase()
  ) || TOP_LOCALITIES[0];

  const matchingProperties = SEED_PROPERTIES.filter(
    p => p.locality.toLowerCase() === targetLocality.name_en.toLowerCase()
  );

  const historical = MarketAnalyticsService.getHistoricalData(targetLocality.city_name, targetLocality.name_en);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Locality Header Hero */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
          <MapPin className="w-4 h-4" />
          <span>Locality Intelligence • {targetLocality.city_name} District</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {targetLocality.name_en} ({targetLocality.name_mr})
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          {targetLocality.description}
        </p>

        {/* Quick Benchmark Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div className="bg-navy-800/80 p-3.5 rounded-2xl border border-navy-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Average Asking Rate</span>
            <span className="text-lg font-extrabold text-emerald-400">₹{targetLocality.avg_price_per_sqft?.toLocaleString('en-IN')}/sq.ft</span>
          </div>
          <div className="bg-navy-800/80 p-3.5 rounded-2xl border border-navy-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Median Flat Price</span>
            <span className="text-lg font-extrabold text-white">₹{((targetLocality.median_price || 4800000)/100000).toFixed(0)} Lakhs</span>
          </div>
          <div className="bg-navy-800/80 p-3.5 rounded-2xl border border-navy-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Pincode</span>
            <span className="text-lg font-extrabold text-white">{targetLocality.pincode}</span>
          </div>
          <div className="bg-navy-800/80 p-3.5 rounded-2xl border border-navy-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Listings</span>
            <span className="text-lg font-extrabold text-emerald-400">{targetLocality.total_listings_count} Properties</span>
          </div>
        </div>
      </div>

      {/* AI Locality Summary */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-emerald-950 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>AI Locality Summary: {targetLocality.name_en}</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          {targetLocality.name_en} is a high-demand residential node in {targetLocality.city_name}. It maintains steady rental yields of ~3.8–4.2% per annum due to nearby schools, medical hospitals, and highway transit corridors.
        </p>
      </div>

      {/* 3-Year Historical Trend */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy-900 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-emerald-600" />
          <span>Historical Price Trend ({targetLocality.name_en})</span>
        </h2>
        <HistoricalTrendChart data={historical} localityName={targetLocality.name_en} cityName={targetLocality.city_name} />
      </div>

      {/* Neighborhood Infrastructure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm">
            <School className="w-5 h-5" />
            <span>Nearby Schools & Colleges</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {targetLocality.nearby_schools?.map((s, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-sm">
            <Hospital className="w-5 h-5" />
            <span>Hospitals & Healthcare</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {targetLocality.nearby_hospitals?.map((h, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
            <Bus className="w-5 h-5" />
            <span>Public Transit & Connectivity</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {targetLocality.nearby_transit?.map((t, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Available Properties in Locality */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy-900">
          Available Listings in {targetLocality.name_en} ({matchingProperties.length})
        </h2>
        
        {matchingProperties.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center text-xs text-slate-500">
            No active listings currently listed in this specific locality.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
