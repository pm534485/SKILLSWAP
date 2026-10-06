import React, { createContext, useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';



























const DEFAULT_USER = {
  id: 'u_default',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  department: 'MCA Computer Applications',
  year: '2nd Year',
  avatar: 'AS',
  rating: 4.9,
  skills: ['React Native', 'Node.js', 'UI/UX Design', 'MongoDB'],
  gigsCompleted: 14,
  gigsPosted: 3
};

const SkillSwapContext = createContext(undefined);

export const SkillSwapProvider = ({
  children
}) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [token, setToken] = useState(null);
  const [selectedGig, setSelectedGig] = useState(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await storage.getToken();
        const storedUser = await storage.getUser();
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        } else {
          // Initialize with default demonstrative MCA user if none saved
          setUser(DEFAULT_USER);
        }
      } catch (e) {
        console.warn('Session load error', e);
      } finally {
        setIsLoadingSession(false);
      }
    };
    loadSession();
  }, []);

  const login = async (userData, sessionToken) => {
    setUser(userData);
    setToken(sessionToken);
    await storage.setUser(userData);
    await storage.setToken(sessionToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setSelectedGig(null);
    await storage.clearSession();
  };

  const updateUserProfile = async (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    await storage.setUser(updated);
  };

  return (
    <SkillSwapContext.Provider
      value={{
        user,
        token,
        selectedGig,
        isLoadingSession,
        setSelectedGig,
        login,
        logout,
        updateUserProfile
      }}>
      {children}
    </SkillSwapContext.Provider>);

};

export const useSkillSwap = () => {
  const context = useContext(SkillSwapContext);
  if (!context) {
    throw new Error('useSkillSwap must be used within a SkillSwapProvider');
  }
  return context;
};

export default SkillSwapContext;