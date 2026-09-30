import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck2, 
  Landmark
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { PropertyCard } from '../components/property/PropertyCard';
import { DisclaimerBanner } from '../components/layout/DisclaimerBanner';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Search Filter State
  const [listingType, setListingType] = useState<'Sale' | 'Rent'>('Sale');
  const [selectedCity, setSelectedCity] = useState('');
  const [queryInput, setQueryInput] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [maxPrice] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('listing_type', listingType);
    if (selectedCity) params.set('city', selectedCity);
    if (queryInput) params.set('query', queryInput);
    if (propertyType) params.set('type', propertyType);
    if (maxPrice) params.set('maxPrice', maxPrice);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Prominent Legal & Government Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[40px] shadow-2xl">
        
        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-md animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-Powered Real Estate & Mahabhumi Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Find the Right Property in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Maharashtra.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Discover verified apartments, independent bungalows, and land plots in Amravati, Pune, Nagpur, Mumbai & across 36 districts with 3-year historical market price trends.
          </p>

          {/* Search Box Component */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl text-slate-900 max-w-4xl mx-auto text-left mt-8">
            
            {/* Buy / Rent Tabs */}
            <div className="flex items-center space-x-2 mb-4 border-b border-slate-200 pb-3">
              <button 
                type="button"
                onClick={() => setListingType('Sale')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${listingType === 'Sale' ? 'bg-navy-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Buy Property
              </button>
              <button 
                type="button"
                onClick={() => setListingType('Rent')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${listingType === 'Rent' ? 'bg-navy-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Rent Property
              </button>
            </div>

            {/* Form Inputs Grid */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              
              {/* City Select */}
              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">City</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
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

              {/* Locality or Property Query */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Locality or Keyword</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder="e.g. Rajapeth, Wakad, Civil Lines..."
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 pl-8 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Property Type Select */}
              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Property Type</label>
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment / Flat</option>
                  <option value="Villa">Villa / Bungalow</option>
                  <option value="Plot">Plot / Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              {/* Search Action Button */}
              <div className="lg:col-span-1 flex items-end">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

            </form>

            {/* Quick Prompt Pill Shortcuts */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs overflow-x-auto">
              <span className="font-semibold text-slate-400 whitespace-nowrap">Popular Searches:</span>
              <button 
                onClick={() => navigate('/properties?city=Amravati&type=Apartment')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap"
              >
                Amravati 2 BHK
              </button>
              <button 
                onClick={() => navigate('/properties?city=Pune&locality=Wakad')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap"
              >
                Wakad Pune
              </button>
              <button 
                onClick={() => navigate('/properties?city=Nagpur&locality=Civil+Lines')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap"
              >
                Nagpur Civil Lines
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* Popular Maharashtra Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 tracking-tight">
              Popular Maharashtra Cities
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore property inventory across Maharashtra's 36 administrative districts.
            </p>
          </div>
          <Link to="/properties" className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1 mt-2 sm:mt-0">
            <span>View All Cities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Amravati', count: '14 Active', rate: '₹4,250/sq.ft', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' },
            { name: 'Pune', count: '42 Active', rate: '₹7,600/sq.ft', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
            { name: 'Nagpur', count: '27 Active', rate: '₹4,800/sq.ft', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
            { name: 'Mumbai', count: '55 Active', rate: '₹24,500/sq.ft', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80' },
            { name: 'Thane', count: '38 Active', rate: '₹12,800/sq.ft', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80' },
            { name: 'Nashik', count: '24 Active', rate: '₹6,400/sq.ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
          ].map(city => (
            <Link 
              key={city.name}
              to={`/properties?city=${city.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md border border-slate-200"
            >
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent p-4 flex flex-col justify-end text-white">
                <div className="font-bold text-base group-hover:text-emerald-400 transition-colors">{city.name}</div>
                <div className="text-[11px] text-slate-300">{city.count}</div>
                <div className="text-[10px] text-emerald-300 font-semibold mt-1 bg-emerald-950/70 backdrop-blur-sm px-2 py-0.5 rounded w-fit">
                  Avg {city.rate}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 tracking-tight">
              Featured Verified Listings
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Handpicked properties with verified ownership status, clear 7/12 records, and RERA disclosures.
            </p>
          </div>
          <Link to="/properties" className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Browse All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_PROPERTIES.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* Government Land Record Spotlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 via-navy-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-navy-800 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-md border border-amber-500/30">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>Mahabhumi 7/12 & Property Card Verification Module</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Official Government Record & Title Guidance
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Before finalizing any land or residential purchase in Maharashtra, check official Satbara (7/12), 8A extracts, CTS Property Cards, and MahaRERA project compliance directly.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Satbara 7/12 Extract Guide</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Urban CTS Property Card</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>e-Hakk Mutation Entries</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 text-center lg:text-right">
            <Link 
              to="/verification"
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all transform hover:scale-105"
            >
              <FileCheck2 className="w-5 h-5" />
              <span>Verify Government Records</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Ask MahaProperty AI Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{t('ask_ai_title')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {t('ask_ai_subtitle')}
            </h3>
          </div>

          <Link 
            to="/ai-assistant"
            className="bg-white text-navy-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all shrink-0 flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t('ask_ai_btn')}</span>
          </Link>

        </div>
      </section>

    </div>
  );
};
