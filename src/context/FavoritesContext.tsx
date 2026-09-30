import React, { createContext, useContext, useState } from 'react';

interface FavoritesContextType {
  favorites: string[]; // Property IDs
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  comparisonList: string[]; // Up to 4 Property IDs
  toggleCompare: (propertyId: string) => boolean; // returns true if added, false if removed/full
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('mahaproperty_favs');
    return saved ? JSON.parse(saved) : ['prop-amr-01', 'prop-pne-01'];
  });

  const [comparisonList, setComparisonList] = useState<string[]>(['prop-amr-01', 'prop-pne-01']);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      const next = exists ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      localStorage.setItem('mahaproperty_favs', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const toggleCompare = (propertyId: string): boolean => {
    if (comparisonList.includes(propertyId)) {
      setComparisonList(prev => prev.filter(id => id !== propertyId));
      return false;
    } else {
      if (comparisonList.length >= 4) {
        alert('You can compare up to 4 properties simultaneously.');
        return false;
      }
      setComparisonList(prev => [...prev, propertyId]);
      return true;
    }
  };

  const isInCompare = (propertyId: string) => comparisonList.includes(propertyId);

  const clearCompare = () => setComparisonList([]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, comparisonList, toggleCompare, isInCompare, clearCompare }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
