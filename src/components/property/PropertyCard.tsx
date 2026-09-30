import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, MapPin, Bed, Bath, Maximize2, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { Property } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, toggleFavorite, isInCompare, toggleCompare } = useFavorites();
  const fav = isFavorite(property.id);
  const inComp = isInCompare(property.id);

  // Format Price to Indian Currency Format (Lakh / Crore)
  const formatIndianPrice = (price: number, listingType: string) => {
    if (listingType === 'Rent' || listingType === 'Lease') {
      return `₹${price.toLocaleString('en-IN')}/mo`;
    }
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case '✓ Verified Listing':
        return 'bg-emerald-500 text-white font-semibold border-emerald-400';
      case 'Government Data':
        return 'bg-blue-600 text-white font-semibold border-blue-400';
      case 'Owner Listed':
        return 'bg-amber-600 text-white font-semibold border-amber-400';
      default:
        return 'bg-navy-800/80 text-slate-200 border-navy-700 backdrop-blur-md';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-300 overflow-hidden flex flex-col group">
      
      {/* Image Container & Floating Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={property.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

        {/* Listing Type Tag (Sale / Rent) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-navy-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase backdrop-blur-md">
            FOR {property.listing_type}
          </span>

          {/* Provenance Badge */}
          <span className={`text-[11px] px-2.5 py-1 rounded-md border shadow-sm flex items-center space-x-1 ${getBadgeStyle(property.data_provenance_badge)}`}>
            {property.verification_status === 'Verified' && <CheckCircle2 className="w-3 h-3 text-white" />}
            <span>{property.data_provenance_badge}</span>
          </span>
        </div>

        {/* Quick Floating Action Buttons (Favorite & Compare) */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          <button 
            onClick={(e) => { e.preventDefault(); toggleCompare(property.id); }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${inComp ? 'bg-emerald-600 text-white shadow-md' : 'bg-navy-900/70 text-slate-200 hover:bg-navy-900'}`}
            title={inComp ? 'Remove from compare' : 'Add to compare'}
          >
            <Scale className="w-4 h-4" />
          </button>

          <button 
            onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${fav ? 'bg-rose-500 text-white shadow-md' : 'bg-navy-900/70 text-slate-200 hover:bg-navy-900 hover:text-rose-400'}`}
            title={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Demo Data Watermark Tag */}
        {property.is_demo_data && (
          <div className="absolute bottom-2 right-2 bg-amber-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
            DEMO DATA
          </div>
        )}

        {/* Location Overlay */}
        <div className="absolute bottom-3 left-3 text-white flex items-center space-x-1 text-xs font-medium drop-shadow-md">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate max-w-[220px]">{property.locality}, {property.city}</span>
        </div>

      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Price Header */}
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-bold text-navy-900 tracking-tight">
              {formatIndianPrice(property.price, property.listing_type)}
            </div>
            <div className="text-xs font-semibold text-slate-500">
              ₹{property.price_per_sqft.toLocaleString('en-IN')}/sq.ft
            </div>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.id}`} className="block">
            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 text-sm leading-snug">
              {property.title}
            </h3>
          </Link>
        </div>

        {/* Spec Pills Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
          <div className="flex items-center space-x-1.5">
            <Bed className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{property.bedrooms ? `${property.bedrooms} Bed` : 'Plot'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Bath className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{property.bathrooms ? `${property.bathrooms} Bath` : 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Maximize2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{property.carpet_area} sq.ft</span>
          </div>
        </div>

        {/* Footer Actions & Owner Info */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-slate-500">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium truncate max-w-[120px]">{property.owner_name}</span>
          </div>

          <Link 
            to={`/properties/${property.id}`}
            className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center space-x-0.5"
          >
            <span>View Details</span>
            <span>→</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
