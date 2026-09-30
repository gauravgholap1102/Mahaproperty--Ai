import React, { useState } from 'react';
import { X, Send, PhoneCall, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Property } from '../../types';

interface ContactOwnerModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactOwnerModal: React.FC<ContactOwnerModalProps> = ({
  property,
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `Hi, I am interested in your property "${property.title}" in ${property.locality}. Please contact me with details.`,
    preferred_contact_time: 'Morning (9 AM - 12 PM)'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Save to localStorage inquiries mock store
      const existing = JSON.parse(localStorage.getItem('mahaproperty_inquiries') || '[]');
      existing.push({
        id: `inq-${Date.now()}`,
        property_id: property.id,
        property_title: property.title,
        ...formData,
        status: 'New',
        created_at: new Date().toISOString()
      });
      localStorage.setItem('mahaproperty_inquiries', JSON.stringify(existing));
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Contact Seller / Owner</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-navy-900">Inquiry Sent Successfully!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Your request has been routed directly to <strong>{property.owner_name}</strong>. They will contact you during your preferred time window.
              </p>
              <button 
                onClick={onClose}
                className="bg-navy-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">{property.title}</div>
                <div className="text-emerald-700 font-bold text-sm">₹{property.price.toLocaleString('en-IN')}</div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Patil"
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98220 00000"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Contact Time</label>
                <select 
                  value={formData.preferred_contact_time}
                  onChange={(e) => setFormData({ ...formData, preferred_contact_time: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                >
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                  <option>Anytime</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message</label>
                <textarea 
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your contact details are kept secure and shared only with the verified listing owner.</span>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
