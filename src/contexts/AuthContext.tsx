
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'customer' | 'seller' | 'admin' | 'business_owner';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isApproved?: boolean;
  businessName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'customer@quickbuy.ph',
    password: 'password',
    name: 'Juan Dela Cruz',
    role: 'customer'
  },
  {
    id: '2',
    email: 'seller@quickbuy.ph',
    password: 'password',
    name: 'Maria Santos',
    role: 'seller',
    isApproved: true,
    businessName: 'Maria\'s Shop'
  },
  {
    id: '3',
    email: 'admin@quickbuy.ph',
    password: 'password',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '4',
    email: 'owner@quickbuy.ph',
    password: 'password',
    name: 'Business Owner',
    role: 'business_owner'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('quickbuy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userToSet = { ...foundUser };
      delete (userToSet as any).password;
      setUser(userToSet);
      localStorage.setItem('quickbuy_user', JSON.stringify(userToSet));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    const newUser = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role || 'customer' as UserRole,
      isApproved: userData.role === 'customer' ? true : false,
      businessName: userData.businessName
    };
    
    mockUsers.push({ ...newUser, password: userData.password });
    setUser(newUser);
    localStorage.setItem('quickbuy_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickbuy_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
