import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Globe, 
  UserCheck, 
  Sparkles, 
  Heart, 
  PlusCircle, 
  Menu, 
  X, 
  ChevronDown, 
  BarChart3, 
  FileCheck2, 
  Scale, 
  Download
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { role, loginAs, isAdmin } = useAuth();
  const { favorites, comparisonList } = useFavorites();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    } else {
      alert('To install MahaProperty AI on your phone or desktop: \n• On Chrome/Edge: Click the install icon in the URL address bar or Menu (⋮) -> Install App.\n• On iOS Safari: Tap Share -> Add to Home Screen.');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-navy-900 text-white sticky top-0 z-50 shadow-md border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  Maha<span className="text-emerald-400">Property</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block tracking-wide">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            <Link 
              to="/properties" 
              className={`px-3 py-2 rounded-lg transition-colors ${isActive('/properties') ? 'bg-navy-800 text-emerald-400 font-semibold' : 'text-slate-200 hover:bg-navy-800/60 hover:text-white'}`}
            >
              {t('nav_properties')}
            </Link>
            <Link 
              to="/properties?listing_type=Sale" 
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-navy-800/60 hover:text-white transition-colors"
            >
              {t('nav_buy')}
            </Link>
            <Link 
              to="/properties?listing_type=Rent" 
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-navy-800/60 hover:text-white transition-colors"
            >
              {t('nav_rent')}
            </Link>
            <Link 
              to="/rera" 
              className={`px-3 py-2 rounded-lg transition-colors ${isActive('/rera') ? 'bg-navy-800 text-emerald-400 font-semibold' : 'text-slate-200 hover:bg-navy-800/60 hover:text-white'}`}
            >
              {t('nav_projects')}
            </Link>
            <Link 
              to="/localities" 
              className={`px-3 py-2 rounded-lg transition-colors ${isActive('/localities') ? 'bg-navy-800 text-emerald-400 font-semibold' : 'text-slate-200 hover:bg-navy-800/60 hover:text-white'}`}
            >
              {t('nav_localities')}
            </Link>
            <Link 
              to="/market-trends" 
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 ${isActive('/market-trends') ? 'bg-navy-800 text-emerald-400 font-semibold' : 'text-slate-200 hover:bg-navy-800/60 hover:text-white'}`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>{t('nav_trends')}</span>
            </Link>
            <Link 
              to="/verification" 
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 ${isActive('/verification') ? 'bg-navy-800 text-emerald-400 font-semibold' : 'text-slate-200 hover:bg-navy-800/60 hover:text-white'}`}
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>{t('nav_intelligence')}</span>
            </Link>
            <Link 
              to="/ai-assistant" 
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 font-semibold shadow-sm ${isActive('/ai-assistant') ? 'ring-2 ring-emerald-400/50' : ''}`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{t('nav_ai')}</span>
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Install App CTA */}
            <button
              onClick={handleInstallApp}
              className="flex items-center space-x-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs px-3 py-2 rounded-lg border border-amber-500/30 transition-colors"
              title="Download & Install App"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">Install App</span>
            </button>

            {/* Compare Badge */}
            {comparisonList.length > 0 && (
              <Link 
                to="/compare"
                className="flex items-center space-x-1 bg-navy-800 hover:bg-navy-700 text-xs px-2.5 py-1.5 rounded-lg border border-navy-700 text-slate-200 transition-colors"
                title="Compare Selected Properties"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compare ({comparisonList.length})</span>
              </Link>
            )}

            {/* Favorites Counter */}
            <Link 
              to="/favorites"
              className="relative p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
              title="View Favorites"
            >
              <Heart className="w-5 h-5 text-rose-400" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 bg-navy-800 hover:bg-navy-700 text-xs text-slate-200 px-3 py-2 rounded-lg border border-navy-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase font-semibold">{language}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-100 py-1.5 z-50 text-xs">
                  <button 
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${language === 'en' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <span>English</span>
                    {language === 'en' && '✓'}
                  </button>
                  <button 
                    onClick={() => { setLanguage('mr'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${language === 'mr' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <span>मराठी</span>
                    {language === 'mr' && '✓'}
                  </button>
                  <button 
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${language === 'hi' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <span>हिंदी</span>
                    {language === 'hi' && '✓'}
                  </button>
                </div>
              )}
            </div>

            {/* Role Demo Switcher (For testing USER, OWNER, AGENT, ADMIN) */}
            <div className="relative">
              <button 
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs px-3 py-2 rounded-lg border border-emerald-500/30 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">{role} Mode</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-100 py-2 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b">
                    Switch Demo Persona
                  </div>
                  <button 
                    onClick={() => { loginAs('USER'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${role === 'USER' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <div>
                      <div className="font-medium">Property Buyer</div>
                      <div className="text-[10px] text-slate-400">Search, Compare, AI</div>
                    </div>
                    {role === 'USER' && '✓'}
                  </button>
                  <button 
                    onClick={() => { loginAs('OWNER'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${role === 'OWNER' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <div>
                      <div className="font-medium">Property Owner</div>
                      <div className="text-[10px] text-slate-400">Post & Manage Listings</div>
                    </div>
                    {role === 'OWNER' && '✓'}
                  </button>
                  <button 
                    onClick={() => { loginAs('AGENT'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${role === 'AGENT' ? 'font-bold text-emerald-600' : ''}`}
                  >
                    <div>
                      <div className="font-medium">RERA Agent / Builder</div>
                      <div className="text-[10px] text-slate-400">Verified Partner Access</div>
                    </div>
                    {role === 'AGENT' && '✓'}
                  </button>
                  <button 
                    onClick={() => { loginAs('ADMIN'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${role === 'ADMIN' ? 'font-bold text-amber-600' : ''}`}
                  >
                    <div>
                      <div className="font-semibold text-amber-700">Administrator</div>
                      <div className="text-[10px] text-slate-400">Moderation, Imports, AI Control</div>
                    </div>
                    {role === 'ADMIN' && '✓'}
                  </button>
                </div>
              )}
            </div>

            {/* Admin Dashboard CTA Link if Admin */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-colors"
              >
                {t('nav_admin')}
              </Link>
            )}

            {/* Post Property Button */}
            <Link 
              to="/post-property" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('nav_post_property')}</span>
            </Link>

          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={handleInstallApp}
              className="p-1.5 text-amber-400 border border-amber-500/30 rounded-lg text-xs flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>App</span>
            </button>
            <Link to="/ai-assistant" className="p-2 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-navy-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link 
              to="/properties" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-navy-900 rounded-lg text-slate-200 hover:text-emerald-400"
            >
              {t('nav_properties')}
            </Link>
            <Link 
              to="/localities" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-navy-900 rounded-lg text-slate-200 hover:text-emerald-400"
            >
              {t('nav_localities')}
            </Link>
            <Link 
              to="/market-trends" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-navy-900 rounded-lg text-slate-200 hover:text-emerald-400"
            >
              {t('nav_trends')}
            </Link>
            <Link 
              to="/verification" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-navy-900 rounded-lg text-slate-200 hover:text-emerald-400"
            >
              {t('nav_intelligence')}
            </Link>
            <Link 
              to="/ai-assistant" 
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 px-3 py-2.5 bg-gradient-to-r from-emerald-600/40 to-teal-600/40 border border-emerald-500/40 rounded-lg text-emerald-300 font-bold text-center flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t('nav_ai')}</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-400">Language:</span>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-2 py-1 rounded ${language === 'en' ? 'bg-emerald-600 text-white font-bold' : 'bg-navy-900'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('mr')} 
                className={`px-2 py-1 rounded ${language === 'mr' ? 'bg-emerald-600 text-white font-bold' : 'bg-navy-900'}`}
              >
                मराठी
              </button>
              <button 
                onClick={() => setLanguage('hi')} 
                className={`px-2 py-1 rounded ${language === 'hi' ? 'bg-emerald-600 text-white font-bold' : 'bg-navy-900'}`}
              >
                हिंदी
              </button>
            </div>
            
            <Link 
              to="/post-property"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold"
            >
              + Post
            </Link>
          </div>

          {isAdmin && (
            <Link 
              to="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full bg-amber-500 text-slate-950 font-bold py-2 rounded-lg text-xs"
            >
              {t('nav_admin')}
            </Link>
          )}
        </div>
      )}

    </header>
  );
};
