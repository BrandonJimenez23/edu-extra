import { Database, TestTube } from 'lucide-react';
import Switch from './Switch';
import { useDataMode } from '../../hooks/useDataMode';

/**
 * DataModeSwitch Component
 * 
 * A reusable component that provides a visual toggle between API and Mock data modes.
 * Shows current mode with appropriate icons and labels.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Size variant ('sm', 'md', 'lg')
 * @param {boolean} [props.showLabels=true] - Whether to show mode labels
 * @param {boolean} [props.vertical=false] - Whether to stack elements vertically
 * @param {string} [props.className] - Additional CSS classes
 */
export default function DataModeSwitch({ 
  size = 'md', 
  showLabels = true, 
  vertical = false,
  className = '' 
}) {
  const { useMockData, toggleDataMode, currentMode } = useDataMode();

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'gap-2 p-2',
      icon: 'h-3 w-3',
      text: 'text-xs',
      switch: 'scale-75'
    },
    md: {
      container: 'gap-3 p-3',
      icon: 'h-4 w-4',
      text: 'text-sm',
      switch: 'scale-90'
    },
    lg: {
      container: 'gap-4 p-4',
      icon: 'h-5 w-5',
      text: 'text-base',
      switch: ''
    }
  };

  const config = sizeConfig[size];
  const containerClass = vertical 
    ? `flex flex-col items-center ${config.container}`
    : `flex items-center ${config.container}`;

  return (
    <div className={`bg-white rounded-lg border shadow-sm ${containerClass} ${className}`}>
      {/* API Mode Indicator */}
      <div className={`flex items-center gap-2 ${vertical ? 'flex-col' : ''}`}>
        <Database className={`${config.icon} ${!useMockData ? 'text-blue-600' : 'text-gray-400'}`} />
        {showLabels && (
          <span className={`${config.text} font-medium ${!useMockData ? 'text-blue-700' : 'text-gray-500'}`}>
            {vertical ? 'API' : 'API'}
          </span>
        )}
      </div>
      
      {/* Switch */}
      <div className={config.switch}>
        <Switch
          checked={useMockData}
          onCheckedChange={toggleDataMode}
          label=""
          size={size}
        />
      </div>
      
      {/* Mock Mode Indicator */}
      <div className={`flex items-center gap-2 ${vertical ? 'flex-col' : ''}`}>
        <TestTube className={`${config.icon} ${useMockData ? 'text-purple-600' : 'text-gray-400'}`} />
        {showLabels && (
          <span className={`${config.text} font-medium ${useMockData ? 'text-purple-700' : 'text-gray-500'}`}>
            {vertical ? 'Mock' : 'Mock'}
          </span>
        )}
      </div>

      {/* Optional Mode Indicator Badge */}
      {!vertical && (
        <div className={`ml-2 px-2 py-1 rounded-full ${config.text} font-semibold ${
          useMockData 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {currentMode.toUpperCase()}
        </div>
      )}
    </div>
  );
}

/**
 * Compact version for tight spaces
 */
export function DataModeSwitchCompact({ className = '' }) {
  return (
    <DataModeSwitch 
      size="sm" 
      showLabels={false} 
      className={className}
    />
  );
}

/**
 * Vertical version for sidebars
 */
export function DataModeSwitchVertical({ className = '' }) {
  return (
    <DataModeSwitch 
      size="md" 
      showLabels={true} 
      vertical={true}
      className={className}
    />
  );
}
