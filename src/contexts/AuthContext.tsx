import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define User type for better type safety
interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  token: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Environment variables
const API_URL = import.meta.env.VITE_API_URL;
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Check environment to determine authentication method
      if (ENVIRONMENT === 'dev-mock') {
        console.log('Using mock authentication in development environment');
        return mockLogin(username, password);
      } else {
        console.log('Using API authentication');
        return await apiLogin(username, password);
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Mock authentication for development
  const mockLogin = (username: string, password: string): boolean => {
    // Simulate API call delay
    if (username === 'admin' && password === 'admin') {
      const user = {
        username: 'admin',
        isAdmin: true,
        id: 'admin',
        token: 'token123',
        name: 'admin',
      };
      
      // Save to state and localStorage
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  // Real API authentication for production 
  const apiLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      
      if (!data) return false;
      
      const user = {
        username: data.user.username,
        isAdmin: true,
        id: data.user.id,
        name: data.user.name,
        token: data.token // Assuming your API returns a token
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("API login error:", error);
      return false;
    }
  };

  const logout = () => {
    // Clear user from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};