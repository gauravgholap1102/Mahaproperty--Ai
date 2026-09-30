import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, ExternalLink, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MAHARASHTRA_DISTRICTS } from '../../data/locations';
import { DATA_SOURCE_REGISTRY } from '../../data/dataSources';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Maha<span className="text-emerald-400">Property</span> AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('tagline')}
            </p>
            <p className="text-xs text-slate-400">
              India's first AI-powered Maharashtra real-estate intelligence & land record verification portal.
            </p>
            <div className="pt-2">
              <Link 
                to="/ai-assistant"
                className="inline-flex items-center space-x-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs px-3 py-2 rounded-lg border border-emerald-500/30 font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Launch AI Assistant</span>
              </Link>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase text-emerald-400">
              Core Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">Property Marketplace</Link>
              </li>
              <li>
                <Link to="/market-trends" className="hover:text-white transition-colors">3-Year Market Trends</Link>
              </li>
              <li>
                <Link to="/verification" className="hover:text-white transition-colors">Mahabhumi 7/12 & Property Card</Link>
              </li>
              <li>
                <Link to="/rera" className="hover:text-white transition-colors">MahaRERA Directory</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">Property Comparison</Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-white transition-colors">MahaProperty AI Chat</Link>
              </li>
            </ul>
          </div>

          {/* Official Government Data Sources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase text-emerald-400">
              Official Data Sources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {DATA_SOURCE_REGISTRY.map(ds => (
                <li key={ds.id}>
                  <a 
                    href={ds.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span className="truncate">{ds.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase text-emerald-400">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/verification" className="hover:text-white transition-colors">Verification Process</Link>
              </li>
              <li>
                <span className="text-slate-400">Data Provenance Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy & Terms</span>
              </li>
              <li>
                <span className="text-slate-400">Admin Portal Log</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Popular Maharashtra Districts Grid */}
        <div className="pt-8 border-t border-navy-800 space-y-3">
          <div className="flex items-center space-x-2 text-white font-semibold text-xs tracking-wider uppercase">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Maharashtra Districts Covered ({MAHARASHTRA_DISTRICTS.length})</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 text-[11px] text-slate-400">
            {MAHARASHTRA_DISTRICTS.map(d => (
              <Link 
                key={d.id}
                to={`/properties?district=${encodeURIComponent(d.name_en)}`}
                className="hover:text-emerald-400 hover:underline truncate"
              >
                {d.name_en}
              </Link>
            ))}
          </div>
        </div>

        {/* Government Record Disclaimer Banner */}
        <div className="bg-navy-900/90 border border-navy-800 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-200 block mb-1">Official Government Record & Provenance Disclaimer:</strong>
            This platform aggregates property and locality information from multiple sources including official public portals (Mahabhumi, MahaRERA, data.gov.in). Government records and legal title status must be independently verified on official government portals before entering into any financial or land transaction. Historical analytics represent labeled data categories (Verified Transactions, Government Open Data, and Portal Asking Prices).
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-navy-900 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} MahaProperty AI. Built for Maharashtra Real Estate Discovery & Intelligence.
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
