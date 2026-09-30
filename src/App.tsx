import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AIChatDrawer } from './components/ai/AIChatDrawer';

import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { MarketTrendsPage } from './pages/MarketTrendsPage';
import { LocalityDetailsPage } from './pages/LocalityDetailsPage';
import { PropertyVerificationPage } from './pages/PropertyVerificationPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PostPropertyPage } from './pages/PostPropertyPage';
import { ComparePage } from './pages/ComparePage';
import { AdminPage } from './pages/AdminPage';

import { ReraPage } from './pages/ReraPage';

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
              
              {/* Header */}
              <Header />

              {/* Main Body */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/properties" element={<PropertiesPage />} />
                  <Route path="/properties/:id" element={<PropertyDetailsPage />} />
                  <Route path="/market-trends" element={<MarketTrendsPage />} />
                  <Route path="/localities" element={<LocalityDetailsPage />} />
                  <Route path="/localities/:city/:locality" element={<LocalityDetailsPage />} />
                  <Route path="/verification" element={<PropertyVerificationPage />} />
                  <Route path="/rera" element={<ReraPage />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/post-property" element={<PostPropertyPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>

              {/* Floating AI Chat Drawer */}
              <AIChatDrawer />

              {/* Footer */}
              <Footer />

            </div>
          </Router>
        </FavoritesProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
