import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, UserRole } from '../types';

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  loginAs: (role: UserRole, name?: string, email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const DEFAULT_DEMO_USERS: Record<UserRole, Profile> = {
  USER: {
    id: 'usr-demo-01',
    email: 'buyer@example.com',
    full_name: 'Amit Kulkarni (Property Buyer)',
    role: 'USER',
    phone: '+91 98220 99887',
    created_at: '2026-01-10T10:00:00Z'
  },
  OWNER: {
    id: 'owner-amr-1',
    email: 'sanjay.deshmukh@example.com',
    full_name: 'Sanjay Deshmukh (Property Owner)',
    role: 'OWNER',
    phone: '+91 98230 11223',
    created_at: '2026-02-15T12:00:00Z'
  },
  AGENT: {
    id: 'agent-pne-1',
    email: 'maharealty@example.com',
    full_name: 'MahaRealty Consultants (RERA Agent)',
    role: 'AGENT',
    phone: '+91 98900 55443',
    created_at: '2026-03-01T09:00:00Z'
  },
  ADMIN: {
    id: 'admin-01',
    email: 'admin@mahaproperty.ai',
    full_name: 'System Administrator (MahaProperty AI)',
    role: 'ADMIN',
    phone: '+91 99000 00000',
    created_at: '2026-01-01T00:00:00Z'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(() => {
    const saved = localStorage.getItem('mahaproperty_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USERS.USER; // Default logged in as demo buyer
  });

  const role: UserRole = user ? user.role : 'USER';
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMIN';

  const loginAs = (targetRole: UserRole, customName?: string, customEmail?: string) => {
    const baseProfile = DEFAULT_DEMO_USERS[targetRole];
    const updatedUser: Profile = {
      ...baseProfile,
      full_name: customName || baseProfile.full_name,
      email: customEmail || baseProfile.email,
    };
    setUser(updatedUser);
    localStorage.setItem('mahaproperty_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mahaproperty_user');
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAs, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
