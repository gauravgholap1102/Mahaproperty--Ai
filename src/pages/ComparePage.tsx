import React from 'react';
import { Scale } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { PropertyComparisonTable } from '../components/property/PropertyComparisonTable';

export const ComparePage: React.FC = () => {
  const { comparisonList, toggleCompare, clearCompare } = useFavorites();

  const compareProperties = SEED_PROPERTIES.filter(p => comparisonList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900 flex items-center space-x-2">
            <Scale className="w-6 h-6 text-emerald-600" />
            <span>Side-by-Side Property Comparison ({compareProperties.length}/4)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare prices, carpet area, furnishings, RERA status, and localities without synthetic scoring bias.
          </p>
        </div>

        {compareProperties.length > 0 && (
          <button 
            onClick={clearCompare}
            className="text-xs font-bold text-slate-500 hover:text-rose-600"
          >
            Clear Comparison List
          </button>
        )}
      </div>

      <PropertyComparisonTable 
        properties={compareProperties}
        onRemove={(id) => toggleCompare(id)}
      />

    </div>
  );
};
