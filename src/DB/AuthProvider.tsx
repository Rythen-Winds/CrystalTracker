import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Function to fetch the current session and set it in the state
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setAuthenticated(!!session);
      } catch (error) {
        throw error;
      }
    };

    // Fetch the current session when the component mounts
    fetchSession();

    // Subscribe to auth state changes and update the session in the state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    // Unsubscribe when the component is unmounted
    return () => subscription.unsubscribe();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const contextValue: AuthContextType = useMemo(
    () => ({
      isAuthenticated,
      setAuthenticated,
    }),
    [isAuthenticated, setAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
