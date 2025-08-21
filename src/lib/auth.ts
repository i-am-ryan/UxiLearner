// Authentication utilities for UXi Education LMS
import { User, AuthState } from './types';
import { mockAPI } from './mock-data';

class AuthService {
  private currentUser: User | null = null;
  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    // Check for stored user in localStorage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('uxi-user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    const state: AuthState = {
      user: this.currentUser,
      isAuthenticated: !!this.currentUser,
      loading: false
    };
    this.listeners.forEach(listener => listener(state));
  }

  async login(email: string, password: string) {
    try {
      const response = await mockAPI.auth.login(email, password);
      
      if (response.success && response.data) {
        this.currentUser = response.data;
        localStorage.setItem('uxi-user', JSON.stringify(response.data));
        this.notify();
        return { success: true, user: response.data };
      }
      
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  }

  async logout() {
    this.currentUser = null;
    localStorage.removeItem('uxi-user');
    this.notify();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  // For development - role switching
  switchRole(userId: string, role: 'student' | 'admin') {
    if (process.env.NODE_ENV === 'development') {
      if (role === 'student') {
        this.currentUser = {
          id: '547030',
          email: 'Musiyariraryan@example.com',
          name: 'Ryan Musiyarira',
          role: 'student'
        };
      } else {
        this.currentUser = {
          id: 'admin001',
          email: 'phillip@uxieducation.com',
          name: 'Phillip',
          role: 'admin'
        };
      }
      localStorage.setItem('uxi-user', JSON.stringify(this.currentUser));
      this.notify();
    }
  }
}

export const authService = new AuthService();

// React hook for auth state
import { useState, useEffect } from 'react';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    loading: false
  });

  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return {
    ...authState,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    switchRole: authService.switchRole.bind(authService)
  };
}