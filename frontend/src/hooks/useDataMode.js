import { useContext } from "react";
import { DataModeContext } from "../contexts/DataModeContext";

/**
 * Hook to use data mode context
 * @returns {Object} Data mode context value
 */
export function useDataMode() {
  const context = useContext(DataModeContext);

  if (context === undefined) {
    throw new Error("useDataMode must be used within a DataModeProvider");
  }

  return context;
}
