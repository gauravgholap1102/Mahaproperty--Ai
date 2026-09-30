import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Scale, 
  MapPin, 
  CheckCircle2, 
  PhoneCall, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { useFavorites } from '../context/FavoritesContext';
import { MarketAnalyticsService } from '../services/marketAnalytics';
import { PropertyMap } from '../components/map/PropertyMap';
import { ContactOwnerModal } from '../components/property/ContactOwnerModal';
import { HistoricalTrendChart } from '../components/market/HistoricalTrendChart';
import { RealEstateCalculators } from '../components/calculator/RealEstateCalculators';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = SEED_PROPERTIES.find(p => p.id === id) || SEED_PROPERTIES[0];

  const { isFavorite, toggleFavorite, isInCompare, toggleCompare } = useFavorites();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(property.images[0]);

  const fav = isFavorite(property.id);
  const inComp = isInCompare(property.id);

  // Compute Price Intelligence
  const priceIntel = MarketAnalyticsService.getPriceIntelligence(property);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-slate-500 flex items-center space-x-2">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-emerald-700">Properties</Link>
        <span>/</span>
        <Link to={`/properties?city=${property.city}`} className="hover:text-emerald-700">{property.city}</Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-[200px]">{property.title}</span>
      </div>

      {/* Title & Quick Actions Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          
          {/* Provenance Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{property.data_provenance_badge}</span>
            </span>
            {property.rera_id && (
              <span className="bg-blue-100 text-blue-800 border border-blue-300 text-xs font-bold px-2.5 py-1 rounded-md">
                MahaRERA: {property.rera_id}
              </span>
            )}
            {property.is_demo_data && (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-2.5 py-1 rounded-md">
                DEMO DATA RECORD
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-snug">
            {property.title}
          </h1>

          <div className="flex items-center space-x-1 text-slate-600 text-xs sm:text-sm">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{property.address}, {property.locality}, {property.city} ({property.district})</span>
          </div>

        </div>

        {/* Price & Action Buttons */}
        <div className="flex flex-col items-start md:items-end space-y-3">
          <div className="text-right">
            <div className="text-3xl font-black text-emerald-700">
              ₹{property.price.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-semibold text-slate-500">
              ₹{property.price_per_sqft.toLocaleString('en-IN')}/sq.ft carpet area
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShare}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 p-2.5 rounded-xl shadow-sm text-xs font-semibold flex items-center space-x-1"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button 
              onClick={() => toggleCompare(property.id)}
              className={`p-2.5 rounded-xl shadow-sm text-xs font-semibold flex items-center space-x-1 transition-colors ${inComp ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
            >
              <Scale className="w-4 h-4" />
              <span>{inComp ? 'In Compare' : 'Compare'}</span>
            </button>

            <button 
              onClick={() => toggleFavorite(property.id)}
              className={`p-2.5 rounded-xl shadow-sm text-xs font-semibold flex items-center space-x-1 transition-colors ${fav ? 'bg-rose-500 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
              <span>{fav ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Image Gallery Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Featured Big Image */}
        <div className="lg:col-span-2 aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden shadow-md border border-slate-200">
          <img 
            src={selectedImage} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Sidebar */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative aspect-[16/10] lg:h-32 rounded-2xl overflow-hidden border-2 transition-all shrink-0 w-36 lg:w-full ${selectedImage === img ? 'border-emerald-600 ring-2 ring-emerald-500/30 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt="Property thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </div>

      {/* Layout Grid: Details & Price Intelligence vs Contact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Specification Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Specification Cards Grid */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy-900 text-base border-b pb-3">Property Overview & Specifications</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Carpet Area</span>
                <span className="font-extrabold text-navy-900 text-sm">{property.carpet_area} sq.ft</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Bedrooms</span>
                <span className="font-extrabold text-navy-900 text-sm">{property.bedrooms || 'Plot'} Bed</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Bathrooms</span>
                <span className="font-extrabold text-navy-900 text-sm">{property.bathrooms || 'N/A'} Bath</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Possession</span>
                <span className="font-extrabold text-emerald-700 text-sm">{property.possession_status}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Floor</span>
                <span className="font-semibold text-slate-900">{property.floor} of {property.total_floors}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Furnishing</span>
                <span className="font-semibold text-slate-900">{property.furnishing || 'Unfurnished'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Facing</span>
                <span className="font-semibold text-slate-900">{property.facing || 'East'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold block uppercase">Property Age</span>
                <span className="font-semibold text-slate-900">{property.property_age_years} Years</span>
              </div>
            </div>
          </div>

          {/* Price Intelligence Widget */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-navy-900 text-base">Price Intelligence & Benchmark</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {priceIntel.comparisonStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block">Current Asking Rate</span>
                <div className="text-xl font-bold text-navy-900">₹{property.price_per_sqft.toLocaleString('en-IN')}/sq.ft</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block">{property.locality} Locality Median</span>
                <div className="text-xl font-bold text-emerald-700">
                  {priceIntel.localityMedianSqft ? `₹${priceIntel.localityMedianSqft.toLocaleString('en-IN')}/sq.ft` : 'Insufficient Data'}
                </div>
              </div>
            </div>

            {/* 3-Year Historical Trend Chart */}
            <HistoricalTrendChart 
              data={priceIntel.historicalTrend} 
              localityName={property.locality} 
              cityName={property.city} 
            />
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-navy-900 text-base border-b pb-3">Description</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Real Estate Financial Calculators (EMI, Stamp Duty, Yield) */}
          <RealEstateCalculators />

          {/* Amenities Grid */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy-900 text-base border-b pb-3">Amenities & Infrastructure</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {property.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map & Nearby Places */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy-900 text-base border-b pb-3">Location & Neighborhood Map</h3>
            <div className="h-80 w-full rounded-2xl overflow-hidden shadow-inner">
              <PropertyMap properties={[property]} zoom={14} />
            </div>
          </div>

        </div>

        {/* Right Sticky Seller / Owner Contact Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-premium space-y-6 sticky top-24">
            
            <div className="space-y-2 border-b pb-4">
              <span className="text-[10px] uppercase font-bold text-slate-400">Listed By</span>
              <div className="font-bold text-navy-900 text-base">{property.owner_name}</div>
              <div className="text-xs text-emerald-700 font-semibold">{property.owner_type}</div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Verification Status:</span>
                <span className="font-bold text-emerald-700">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Response Time:</span>
                <span className="font-semibold text-slate-900">Under 2 Hours</span>
              </div>
            </div>

            <button 
              onClick={() => setContactModalOpen(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Owner / Agent</span>
            </button>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center space-x-1.5 text-slate-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Buyer Protection</span>
              </div>
              <p className="text-[10px]">
                Phone numbers are masked to prevent unauthorized spam. Inquiries are logged securely.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Contact Owner Modal */}
      <ContactOwnerModal 
        property={property}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

    </div>
  );
};
