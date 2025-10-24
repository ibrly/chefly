import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '@/services/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: {
    type: 'client' | 'chef' | 'admin';
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider mounted');
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      console.log('Loading user...');
      const token = await AsyncStorage.getItem('auth_token');
      console.log('Token found:', !!token);
      
      if (token) {
        const response = await apiClient.get('/auth/me');
        console.log('User loaded:', response.data);
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          throw new Error('Failed to load user');
        }
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('refresh_token');
    } finally {
      console.log('Loading complete, setting loading to false');
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const { data } = response.data;
      await AsyncStorage.setItem('auth_token', data.accessToken);
      await AsyncStorage.setItem('refresh_token', data.refreshToken);
      setUser(data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string, role: string) => {
    try {
      const response = await apiClient.post('/auth/register', {
        email,
        password,
        username,
        role,
      });

      const { data } = response.data;
      await AsyncStorage.setItem('auth_token', data.accessToken);
      await AsyncStorage.setItem('refresh_token', data.refreshToken);
      setUser(data.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('refresh_token');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

