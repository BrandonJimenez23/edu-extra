import { createContext, useState, useEffect } from 'react';

/**
 * Data Mode Context
 * 
 * Provides a global switch between mock data and real API data
 * throughout the application for development and testing purposes.
 * User preference is persisted in localStorage.
 */
export const DataModeContext = createContext({});

const STORAGE_KEY = 'eduextra-data-mode';

/**
 * Data Mode Provider Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function DataModeProvider({ children }) {
  // Initialize from localStorage or default to API mode
  const [useMockData, setUseMockData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : false; // Default to real API data
    } catch (error) {
      console.warn('Failed to load data mode preference:', error);
      return false;
    }
  });

  // Persist to localStorage whenever mode changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(useMockData));
    } catch (error) {
      console.warn('Failed to save data mode preference:', error);
    }
  }, [useMockData]);

  /**
   * Toggle between mock and real data
   */
  const toggleDataMode = () => {
    setUseMockData(prev => !prev);
  };

  /**
   * Set specific data mode
   * @param {boolean} mockMode - Whether to use mock data
   */
  const setDataMode = (mockMode) => {
    setUseMockData(mockMode);
  };

  const value = {
    useMockData,
    toggleDataMode,
    setDataMode,
    currentMode: useMockData ? 'mock' : 'api'
  };

  return (
    <DataModeContext.Provider value={value}>
      {children}
    </DataModeContext.Provider>
  );
}
