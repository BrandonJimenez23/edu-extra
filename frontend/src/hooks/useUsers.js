import { useDataMode } from "./useDataMode";
import useUsersApi from "./useUsersApi";
import useUsersMock from "./useUsersMock";

/**
 * Unified Users Hook
 * 
 * Smart hook that automatically delegates to either API or Mock hook
 * based on the current data mode. Provides a single interface for
 * user management operations.
 */
export default function useUsers() {
    const { useMockData } = useDataMode();
    
    // Delegate to appropriate hook based on data mode
    const apiHook = useUsersApi();
    const mockHook = useUsersMock();
    
    // Return the appropriate hook based on current mode
    const activeHook = useMockData ? mockHook : apiHook;

    return {
        ...activeHook,
        
        // Add metadata about current mode
        useMockData,
        
        // Mock-specific actions (available in both modes now)
        resetMockData: useMockData ? mockHook.resetMockData : undefined,
        getUserStats: activeHook.getUserStats, // Available in both hooks now
    };
}
