import React from 'react';
import { Heart, Scale } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { PropertyCard } from '../components/property/PropertyCard';
import { Link } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
  const { favorites, comparisonList } = useFavorites();

  const favProperties = SEED_PROPERTIES.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900 flex items-center space-x-2">
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
            <span>My Favorite Properties ({favProperties.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bookmarked listings saved for fast access and side-by-side comparison.
          </p>
        </div>

        {comparisonList.length > 0 && (
          <Link 
            to="/compare"
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center space-x-1.5"
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Compare Selected ({comparisonList.length})</span>
          </Link>
        )}
      </div>

      {favProperties.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-navy-900">Your Favorites List is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore active properties across Amravati, Pune, Nagpur & Mumbai and click the heart icon to save them.
          </p>
          <Link 
            to="/properties"
            className="inline-block bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}

    </div>
  );
};
