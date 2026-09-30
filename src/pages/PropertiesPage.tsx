import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Map, LayoutGrid, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { SEED_PROPERTIES } from '../data/seedProperties';
import type { ListingType } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyMap } from '../components/map/PropertyMap';

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State synced with URL
  const [listingType, setListingType] = useState<ListingType>(
    (searchParams.get('listing_type') as ListingType) || 'Sale'
  );
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || '');
  const [queryKeyword, setQueryKeyword] = useState(searchParams.get('query') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');
  const [ownerOnly, setOwnerOnly] = useState(searchParams.get('ownerOnly') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  
  // View Toggle (Grid View vs Map Split View)
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Filter Logic
  const filteredProperties = SEED_PROPERTIES.filter(p => {
    if (listingType && p.listing_type !== listingType) return false;
    if (selectedCity && p.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    if (selectedDistrict && p.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (propertyType && p.property_type !== propertyType) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    if (verifiedOnly && p.verification_status !== 'Verified') return false;
    if (ownerOnly && p.owner_type !== 'Owner') return false;
    if (queryKeyword) {
      const q = queryKeyword.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLocality = p.locality.toLowerCase().includes(q);
      const matchAddress = p.address.toLowerCase().includes(q);
      if (!matchTitle && !matchLocality && !matchAddress) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'price-sqft') return a.price_per_sqft - b.price_per_sqft;
    if (sortBy === 'area') return b.carpet_area - a.carpet_area;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Update URL parameters when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (listingType) params.set('listing_type', listingType);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedDistrict) params.set('district', selectedDistrict);
    if (queryKeyword) params.set('query', queryKeyword);
    if (propertyType) params.set('type', propertyType);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (verifiedOnly) params.set('verified', 'true');
    if (ownerOnly) params.set('ownerOnly', 'true');
    if (sortBy) params.set('sort', sortBy);
    setSearchParams(params);
  }, [listingType, selectedCity, selectedDistrict, queryKeyword, propertyType, maxPrice, verifiedOnly, ownerOnly, sortBy, setSearchParams]);

  const resetFilters = () => {
    setListingType('Sale');
    setSelectedCity('');
    setSelectedDistrict('');
    setQueryKeyword('');
    setPropertyType('');
    setMaxPrice('');
    setVerifiedOnly(false);
    setOwnerOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900 tracking-tight">
            Maharashtra Property Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {filteredProperties.length} active property listings across Maharashtra
          </p>
        </div>

        {/* View Toggle & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Grid / Map Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-semibold">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors ${viewMode === 'grid' ? 'bg-white text-navy-900 shadow-sm font-bold' : 'text-slate-600 hover:text-navy-900'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors ${viewMode === 'map' ? 'bg-white text-navy-900 shadow-sm font-bold' : 'text-slate-600 hover:text-navy-900'}`}
            >
              <Map className="w-3.5 h-3.5 text-emerald-600" />
              <span>Map View</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-emerald-500"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-sqft">Price / Sq.Ft</option>
            <option value="area">Carpet Area</option>
          </select>

        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Results Grid/Map */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-6 h-fit sticky top-24">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-navy-900 text-sm flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Filter Properties</span>
            </h3>
            <button 
              onClick={resetFilters}
              className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Buy / Rent Switch */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Listing Purpose</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button 
                type="button"
                onClick={() => setListingType('Sale')}
                className={`py-2 rounded-xl transition-all ${listingType === 'Sale' ? 'bg-navy-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Sale
              </button>
              <button 
                type="button"
                onClick={() => setListingType('Rent')}
                className={`py-2 rounded-xl transition-all ${listingType === 'Rent' ? 'bg-navy-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Rent
              </button>
            </div>
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select City</label>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-medium"
            >
              <option value="">All Cities</option>
              <option value="Amravati">Amravati</option>
              <option value="Pune">Pune</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Thane">Thane</option>
              <option value="Nashik">Nashik</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
            </select>
          </div>

          {/* Keyword Query */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Locality / Keyword</label>
            <input 
              type="text"
              value={queryKeyword}
              onChange={(e) => setQueryKeyword(e.target.value)}
              placeholder="e.g. Rajapeth, Wakad..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-medium"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
            <select 
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-medium"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment / Flat</option>
              <option value="Villa">Villa / Bungalow</option>
              <option value="Plot">Plot / Land</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Max Budget Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Max Budget</span>
              <span className="text-emerald-700">
                {maxPrice ? `₹${(parseInt(maxPrice)/100000).toFixed(0)} Lakh` : 'Any Budget'}
              </span>
            </div>
            <input 
              type="range"
              min="1000000"
              max="30000000"
              step="500000"
              value={maxPrice || "30000000"}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Verification & Owner Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
              <input 
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>✓ Verified Listings Only</span>
            </label>
            <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
              <input 
                type="checkbox"
                checked={ownerOnly}
                onChange={(e) => setOwnerOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Direct Owner Listed</span>
            </label>
          </div>

        </div>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {viewMode === 'map' ? (
            <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              <PropertyMap properties={filteredProperties} zoom={8} />
            </div>
          ) : (
            <>
              {filteredProperties.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
                  <Search className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-navy-900">No properties match your exact filters</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your budget range, selected city, or resetting active search filters.
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="bg-navy-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map(prop => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
};
