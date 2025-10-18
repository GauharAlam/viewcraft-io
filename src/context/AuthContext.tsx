// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import apiClient from '@/services/api'; // Import your API client

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Replace 'any' with a proper User interface later
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Store user details if needed
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // To check initial auth status

  useEffect(() => {
    // Check for token in localStorage on initial load
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Optional: Fetch user details using the token
      // fetchUserDetails(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    // Optional: Fetch user details after login
    // fetchUserDetails(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    // Optional: Redirect to login page using useNavigate if needed here
  };

  // Optional function to fetch user details (requires a backend endpoint like /api/auth/me)
  // const fetchUserDetails = async (authToken) => {
  //   try {
  //     // You'd need to create this endpoint on your backend
  //     const response = await apiClient.get('/auth/me', {
  //       headers: { Authorization: `Bearer ${authToken}` }
  //     });
  //     setUser(response.data.user);
  //   } catch (error) {
  //     console.error("Failed to fetch user details", error);
  //     logout(); // Logout if token is invalid
  //   }
  // };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};