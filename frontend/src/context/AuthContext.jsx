"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

const defaultAuth = {
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {}
};

const AuthContext = createContext(defaultAuth);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedToken = localStorage.getItem('bnb_token');
      const savedUser = localStorage.getItem('bnb_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Verify with backend
        api.get('/auth/me')
          .then(res => {
            if (res.data) {
              setUser(res.data);
              localStorage.setItem('bnb_user', JSON.stringify(res.data));
            }
          })
          .catch(() => {
            // Keep local cached user if offline
          });
      }
    } catch (e) {
      console.error('Error loading stored user', e);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data && res.data.token) {
      setToken(res.data.token);
      setUser(res.data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bnb_token', res.data.token);
        localStorage.setItem('bnb_user', JSON.stringify(res.data.user));
      }
    }
    return res.data;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    if (res.data && res.data.token) {
      setToken(res.data.token);
      setUser(res.data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bnb_token', res.data.token);
        localStorage.setItem('bnb_user', JSON.stringify(res.data.user));
      }
    }
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bnb_token');
      localStorage.removeItem('bnb_user');
    }
  };

  const updateUser = (updatedData) => {
    const merged = { ...user, ...updatedData };
    setUser(merged);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bnb_user', JSON.stringify(merged));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext) || defaultAuth;
