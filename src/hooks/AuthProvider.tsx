import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface UserData {
  user: any;
  token: string;
}

interface AuthContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Changed to use a function for initializing state with data from localStorage
  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      return JSON.parse(storedUserData);
    }
    return null;
  });

  // Removed the useEffect for initial data fetching

  // useEffect now only updates local storage when userData changes
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
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
