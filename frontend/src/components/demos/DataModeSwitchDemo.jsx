import { DataModeSwitch, DataModeSwitchCompact, DataModeSwitchVertical } from '../ui';

/**
 * DataModeSwitchDemo Component
 * 
 * Demonstrates all available variants of the DataModeSwitch component.
 * Useful for the Component Library page.
 */
export default function DataModeSwitchDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Data Mode Switch Variants
        </h3>
        <p className="text-gray-600 mb-6">
          Switches between API and Mock data modes throughout the application.
          User preference is automatically saved to localStorage.
        </p>
      </div>

      {/* Standard Switch */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Standard (Default)</h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          <DataModeSwitch />
        </div>
        <p className="text-sm text-gray-600">
          Full-featured switch with labels, icons, and mode indicator.
        </p>
      </div>

      {/* Compact Switch */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Compact (TopBar)</h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          <DataModeSwitchCompact />
        </div>
        <p className="text-sm text-gray-600">
          Compact version for tight spaces like the top navigation bar.
        </p>
      </div>

      {/* Vertical Switch */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Vertical (Sidebar)</h4>
        <div className="p-4 bg-gray-50 rounded-lg flex justify-center">
          <DataModeSwitchVertical />
        </div>
        <p className="text-sm text-gray-600">
          Vertical layout optimized for sidebars and narrow spaces.
        </p>
      </div>

      {/* Size Variants */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Size Variants</h4>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Small</span>
                <DataModeSwitch size="sm" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Medium (Default)</span>
                <DataModeSwitch size="md" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Large</span>
                <DataModeSwitch size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Usage</h4>
        <div className="p-4 bg-gray-900 rounded-lg text-green-400 font-mono text-sm overflow-x-auto">
          <div className="space-y-2">
            <div>// Standard usage</div>
            <div>{'import { DataModeSwitch } from "../components/ui";'}</div>
            <div>{'<DataModeSwitch />'}</div>
            <br />
            <div>// Compact for TopBar</div>
            <div>{'import { DataModeSwitchCompact } from "../components/ui";'}</div>
            <div>{'<DataModeSwitchCompact className="hidden sm:flex" />'}</div>
            <br />
            <div>// Vertical for Sidebar</div>
            <div>{'import { DataModeSwitchVertical } from "../components/ui";'}</div>
            <div>{'<DataModeSwitchVertical />'}</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Features</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
          <li>🔄 Switches between API and Mock data modes</li>
          <li>💾 Automatically saves user preference to localStorage</li>
          <li>📱 Responsive design with mobile-friendly variants</li>
          <li>🎨 Consistent with design system colors and typography</li>
          <li>♿ Accessible with proper ARIA labels</li>
          <li>⚡ Lightweight with minimal re-renders</li>
        </ul>
      </div>
    </div>
  );
}
