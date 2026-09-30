import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import type { PropertyType, ListingType, FurnishingStatus, PossessionStatus } from '../types';
import { MAHARASHTRA_DISTRICTS } from '../data/locations';

export const PostPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    listing_type: 'Sale' as ListingType,
    property_type: 'Apartment' as PropertyType,
    district: 'Amravati',
    city: 'Amravati',
    locality: 'Rajapeth',
    address: '',
    price: 4500000,
    carpet_area: 1050,
    bedrooms: 2,
    bathrooms: 2,
    furnishing: 'Semi-Furnished' as FurnishingStatus,
    possession_status: 'Ready to Move' as PossessionStatus,
    rera_id: '',
    amenities: ['Lift', 'Covered Parking', 'Security Guard', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ]
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          List Your Property on MahaProperty AI
        </h1>
        <p className="text-xs text-slate-500">
          8-Step Guided Posting Process • Admin Moderation Approval Queue
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
          <span>Step {currentStep} of 8</span>
          <span className="text-emerald-700">
            {currentStep === 1 && 'Basic Details'}
            {currentStep === 2 && 'Location Details'}
            {currentStep === 3 && 'Pricing & Terms'}
            {currentStep === 4 && 'Specifications'}
            {currentStep === 5 && 'Amenities'}
            {currentStep === 6 && 'Photos & Media'}
            {currentStep === 7 && 'Preview & Review'}
            {currentStep === 8 && 'Submit for Moderation'}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Property Submitted for Review!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your property submission <strong>"{formData.title}"</strong> has been assigned status <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">Pending Review</span>. It will be published publicly upon admin approval.
            </p>
            <button 
              onClick={() => navigate('/properties')}
              className="bg-navy-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
            >
              Back to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-navy-900 border-b pb-2">Step 1: Basic Property Information</h3>
                
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Property Title *</label>
                  <input 
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern 2 BHK Flat near Rajapeth Square"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Listing Type</label>
                    <select 
                      value={formData.listing_type}
                      onChange={(e) => setFormData({ ...formData, listing_type: e.target.value as ListingType })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                    >
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Property Type</label>
                    <select 
                      value={formData.property_type}
                      onChange={(e) => setFormData({ ...formData, property_type: e.target.value as PropertyType })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                    >
                      <option value="Apartment">Apartment / Flat</option>
                      <option value="Villa">Villa / Bungalow</option>
                      <option value="Plot">Plot / Land</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Detailed Description *</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide overview of room layout, sunlight exposure, nearby landmarks..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-navy-900 border-b pb-2">Step 2: Property Location</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District</label>
                    <select 
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                    >
                      {MAHARASHTRA_DISTRICTS.map(d => (
                        <option key={d.id} value={d.name_en}>{d.name_en}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Locality / Area Name *</label>
                    <input 
                      type="text"
                      required
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="e.g. Rajapeth, Wakad, Civil Lines"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Complete Address *</label>
                  <input 
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Plot / Flat No, Building Name, Street Address"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Price */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-navy-900 border-b pb-2">Step 3: Pricing & RERA Registration</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Asking Price (₹) *</label>
                    <input 
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Carpet Area (sq.ft) *</label>
                    <input 
                      type="number"
                      required
                      value={formData.carpet_area}
                      onChange={(e) => setFormData({ ...formData, carpet_area: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">MahaRERA Registration Number (Optional)</label>
                  <input 
                    type="text"
                    value={formData.rera_id}
                    onChange={(e) => setFormData({ ...formData, rera_id: e.target.value })}
                    placeholder="e.g. P50500098765"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                  />
                </div>
              </div>
            )}

            {/* Step 4 to 8 Shortcuts */}
            {currentStep >= 4 && currentStep <= 7 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-navy-900 border-b pb-2">Step {currentStep}: Additional Details & Preview</h3>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900">{formData.title || 'Untitled Listing'}</div>
                  <div className="text-emerald-700 font-bold">₹{formData.price.toLocaleString('en-IN')}</div>
                  <div className="text-slate-600">{formData.locality}, {formData.city} ({formData.carpet_area} sq.ft)</div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-navy-900 border-b pb-2">Step 8: Final Submission</h3>
                <p className="text-slate-600">
                  By clicking Submit, your listing will be sent to the admin moderation queue. Status will be marked as <span className="font-bold text-amber-700">pending_review</span>.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button 
                  type="button"
                  onClick={prevStep}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 8 ? (
                <button 
                  type="button"
                  onClick={nextStep}
                  className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow flex items-center space-x-1"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow flex items-center space-x-1"
                >
                  <span>Submit Listing</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
