import React from 'react';
import { Property } from '../../types';
import { Check, X, Scale, AlertCircle } from 'lucide-react';

interface PropertyComparisonTableProps {
  properties: Property[];
  onRemove: (id: string) => void;
}

export const PropertyComparisonTable: React.FC<PropertyComparisonTableProps> = ({
  properties,
  onRemove
}) => {
  if (properties.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
        <Scale className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-lg font-bold text-navy-900">No Properties Selected for Comparison</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Click the comparison icon on any property card to select up to 4 properties side-by-side.
        </p>
      </div>
    );
  }

  // Generate objective, neutral Key Differences summary
  const generateDifferencesSummary = () => {
    if (properties.length < 2) return "Select at least 2 properties to generate key differences summary.";

    const prices = properties.map(p => p.price);
    const minPriceProp = properties.find(p => p.price === Math.min(...prices));
    const maxPriceProp = properties.find(p => p.price === Math.max(...prices));

    const areas = properties.map(p => p.carpet_area);
    const maxAreaProp = properties.find(p => p.carpet_area === Math.max(...areas));

    return `• Price Range: Varies from ₹${(Math.min(...prices)/100000).toFixed(2)} Lakhs (${minPriceProp?.locality}) up to ₹${(Math.max(...prices)/100000).toFixed(2)} Lakhs (${maxPriceProp?.locality}).
• Area Comparison: ${maxAreaProp?.title} offers the largest carpet area at ${maxAreaProp?.carpet_area} sq.ft.
• Verification: ${properties.filter(p => p.verification_status === 'Verified').length} out of ${properties.length} properties carry verified listing status.`;
  };

  return (
    <div className="space-y-6">
      
      {/* Neutral Key Differences Summary */}
      <div className="bg-navy-900 text-white rounded-2xl p-5 border border-navy-800 space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>Objective Key Differences Summary (Neutral Analysis)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
          {generateDifferencesSummary()}
        </p>
        <p className="text-[11px] text-slate-400 italic pt-1">
          Note: MahaProperty AI provides objective comparison data without biased or unvalidated "best property" scores.
        </p>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-700 w-48 sticky left-0 bg-slate-50 border-r">Specification</th>
              {properties.map(p => (
                <th key={p.id} className="p-4 min-w-[220px] max-w-[260px] align-top border-r">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {p.data_provenance_badge}
                    </span>
                    <button 
                      onClick={() => onRemove(p.id)}
                      className="text-slate-400 hover:text-rose-500 font-bold text-sm p-1"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                  <img src={p.images[0]} alt={p.title} className="w-full h-24 object-cover rounded-xl mb-2" />
                  <div className="font-bold text-navy-900 text-sm line-clamp-2">{p.title}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Price</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 font-bold text-emerald-700 text-sm border-r">
                  ₹{p.price.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Price / Sq.Ft</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 font-semibold text-slate-900 border-r">
                  ₹{p.price_per_sqft.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Carpet Area</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-slate-700 border-r">{p.carpet_area} sq.ft</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Bedrooms & Baths</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-slate-700 border-r">
                  {p.bedrooms || 0} BHK / {p.bathrooms || 0} Bath
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Floor / Total</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-slate-700 border-r">
                  Floor {p.floor || 1} of {p.total_floors || 1}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Furnishing</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-slate-700 border-r">{p.furnishing || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Parking</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-slate-700 border-r">
                  {p.parking ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">Locality & City</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-slate-700 border-r">{p.locality}, {p.city}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white border-r">RERA Status</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-slate-700 border-r">
                  {p.rera_id ? (
                    <span className="text-emerald-700 font-bold">Approved ({p.rera_id})</span>
                  ) : (
                    <span className="text-slate-400">N/A</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
