import { createContext, useState } from 'react';

/**
 * Data Mode Context
 * 
 * Provides a global switch between mock data and real API data
 * throughout the application for development and testing purposes.
 */
export const DataModeContext = createContext({});

/**
 * Data Mode Provider Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function DataModeProvider({ children }) {
  const [useMockData, setUseMockData] = useState(false); // Default to real API data

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
