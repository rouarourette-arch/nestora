import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to true for easy preview, but provide full login/logout flows
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('nestora_demo_auth');
    return saved !== 'false';
  });

  const login = async (_email: string, _pass: string): Promise<boolean> => {
    // Simulated demo authentication delay
    await new Promise((r) => setTimeout(r, 400));
    setIsAuthenticated(true);
    localStorage.setItem('nestora_demo_auth', 'true');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('nestora_demo_auth', 'false');
  };

  const register = async (_name: string, _email: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 400));
    setIsAuthenticated(true);
    localStorage.setItem('nestora_demo_auth', 'true');
    return true;
  };

  const resetPassword = async (_email: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 400));
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
